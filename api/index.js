require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Client } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const winston = require("winston");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = 5353; // Add a fallback port
const JWT_SECRET = process.env.JWT_SECRET;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' })
  ],
});

// Check if environment variables are loaded correctly
console.log(`JWT_SECRET: ${process.env.JWT_SECRET}`);
console.log(`API_BASE_URL: ${process.env.API_BASE_URL}`);

// app.use(
//   cors({
//     origin: process.env.API_BASE_URL, // Fix the CORS origin to use process.env
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

app.use(bodyParser.json());

// PostgreSQL client setup
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

client.connect();

// Rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (15 minutes)
  message: "Too many requests from this IP, please try again later.",
});

app.use("/api/", apiLimiter);

// Sample endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Registration endpoint
app.post("/createAccount", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query =
      "INSERT INTO hotels (name, email, password) VALUES ($1, $2, $3) RETURNING *";
    const values = [name, email, hashedPassword];
    const result = await client.query(query, values);

    res
      .status(201)
      .json({ user: result.rows[0], message: "User registered successfully!" });
  } catch (err) {
    logger.error("Error during registration:", err);
    res.status(500).json({ message: "Registration failed" });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const query = "SELECT * FROM hotels WHERE email = $1";
    const result = await client.query(query, [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, message: "Login successful!" });
  } catch (err) {
    logger.error("Error during login:", err);
    res.status(500).json({ message: "Login failed" });
  }
});

// Middleware to check if the token is blacklisted
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   if (!token) return res.sendStatus(401);

//   redis.sismember('blacklistedTokens', token, (err, result) => {
//     if (err) return res.status(500).json({ message: 'Internal server error' });
//     if (result === 1) return res.sendStatus(403);

//     jwt.verify(token, JWT_SECRET, (err, user) => {
//       if (err) return res.sendStatus(403);
//       req.user = user;
//       next();
//     });
//   });
// };

// Logout endpoint

// Middleware to check if the token is blacklisted

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  try {
    const query = "SELECT * FROM blacklisted_tokens WHERE token = $1";
    const result = await client.query(query, [token]);
    if (result.rows.length > 0) return res.sendStatus(403);

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } catch (err) {
    logger.error("Error during token authentication:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

app.post("/logout", async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  try {
    const query = "INSERT INTO blacklisted_tokens (token) VALUES ($1)";
    await client.query(query, [token]);
    res.json({ message: "Logged out successfully!" });
  } catch (err) {
    logger.error("Error during logout:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Centralized error handling
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});
console.log(
  "your port is " + process.env.API_BASE_URL + "\n" + process.env.JWT_SECRET
);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://${process.env.API_BASE_URL}`);
});

// const express = require ('express');
// const bodyParser = require ('body-parser');
// const cors = require ('cors');
// const {Client}  = require ('pg');
// const bcrypt = require ('bcrypt'); // For password hashing
// const jwt = require ('jsonwebtoken'); // For creating JWT tokens
// const blacklistedTokens = new Set();
// const app = express();
// const PORT = 5000;
// require('dotenv').config();

// const JWT_SECRET = process.env.JWT_SECRET;// Replace with a secure key

// app.use(cors());
// app.use(bodyParser.json());

// const client = new Client({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });

// client.connect();

// // Sample endpoint
// app.get('/', (req, res) => {
//   res.send('Welcome to the API!');
// });

// // Registration endpoint
// app.post('/createAccount', async (req, res) => {
//   const { name, email, password } = req.body;
//   console.log("DATA::::", req.body);
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
//     const query = 'INSERT INTO hotels (name, email, password) VALUES ($1, $2, $3) RETURNING *';
//     const values = [name, email, hashedPassword];
//     const result = await client.query(query, values);
//     console.log(hashedPassword);

//     res.status(201).json({ user: result.rows[0], message: 'User registered successfully!' });
//   } catch (err) {
//     console.error('Error during registration:', err);
//     res.status(500).json({ message: 'Registration failed' });
//   }
// });

// // Login endpoint
// app.post('/login', async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   console.log("data", email, password);

//   console.log("OOPS Yes Are Calling Me ")
//   try {
//     // Fetch user from the database
//     const query = 'SELECT * FROM hotels WHERE email = $1';
//     const result = await client.query(query, [email]);
//     if (result.rows.length === 0) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const user = result.rows[0];
//     console.log("oops", user);

//     // Compare the hashed password
//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Create a JWT token
//     const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

//     res.json({ token, message: 'Login successful!' });
//   } catch (err) {
//     console.error('Error during login:', err);
//     res.status(500).json({ message: 'Login failed' });
//   }
// });

// // Middleware to check if the token is blacklisted
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   if (token == null) return res.sendStatus(401);
//   if (blacklistedTokens.has(token)) return res.sendStatus(403); // Forbidden

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// };

// // Logout endpoint
// app.post('/logout', authenticateToken, (req, res) => {
//   const token = req.headers['authorization'].split(' ')[1];
//   blacklistedTokens.add(token); // Add token to blacklist
//   res.json({ message: 'Logged out successfully!' });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://192.168.3.174:${PORT}`);
// });
