import React, { useEffect, useState } from "react";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, Alert, KeyboardAvoidingView, Pressable, SafeAreaView, TextInput, View, StyleSheet } from "react-native";
import  {endpoints} from '../../apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          router.replace("/(home)");
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkLogin();
  }, []);

  const signUpWithEmail = async () => {
    try {
      const response = await fetch(endpoints.login, {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('authToken', result.token);
        Alert.alert('Success', 'Login successful!');
        router.replace("/(home)");
      } else {
        Alert.alert('Error', result.message || 'Login failed.');
      }
    } catch (err) {
      console.error('Error while logging in:', err);
      Alert.alert('Error', 'Please again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Food App</Text>
      </View>

      <KeyboardAvoidingView>
        <View style={styles.centered}>
          <Text style={styles.subHeaderText}>Log in to your account</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <MaterialIcons name="email" size={24} color="gray" style={styles.icon} />
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.textInput}
              placeholder="Enter your Email"
            />
          </View>

          <View style={styles.inputWrapper}>
            <AntDesign name="lock1" size={24} color="black" style={styles.icon} />
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={styles.textInput}
              placeholder="Enter your password"
              secureTextEntry
            />
          </View>
        </View>

        <View style={styles.footer}>  
          <Text>Keep me Logged In</Text>
          <Text>Forgot Password</Text>
        </View>

        <Pressable onPress={signUpWithEmail} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Pressable onPress={() => router.replace("/register")} style={styles.link}>
          <Text style={styles.linkText}>Don't have an Account? Sign Up</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", alignItems: "center" },
  header: { marginTop: 50 },
  headerText: { fontSize: 20, textAlign: "center", fontWeight: "bold" },
  centered: { alignItems: "center" },
  subHeaderText: { fontSize: 17, fontWeight: "bold", marginTop: 12, color: "red" },
  inputContainer: { marginTop: 70 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0E0E0",
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 30,
    width: 300
  },
  icon: { marginLeft: 8 },
  textInput: { color: "gray", marginVertical: 10, flex: 1 },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    width: 300
  },
  button: {
    width: 200,
    backgroundColor: "#fd5c63",
    borderRadius: 6,
    padding: 15,
    marginTop: 50,
    alignItems: "center"
  },
  buttonText: { textAlign: "center", fontWeight: "bold", fontSize: 16, color: "white" },
  link: { marginTop: 15 },
  linkText: { textAlign: "center", color: "gray", fontSize: 16 }
});

export default Login;




// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   TextInput,
//   Pressable,
//   Alert,
// } from "react-native";
// import { useEffect, useState } from "react";
// import { MaterialIcons } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import React from "react";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();
//   const url="http://192.168.3.51:";

//   useEffect(() => {
//     const checkLogin = async () => {
//       try {
//         const token = await AsyncStorage.getItem("authToken");
//         if (token) {
//           router.replace("/(home)");
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     checkLogin();
//   }, []);

//   async function signUpWithEmail() {
//     try {
//       const response = await fetch(url+'5000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });
  
//       const result = await response.json();
  
//       if (response.ok) {
//         // Store the token in AsyncStorage
//         const token = result.token;
//         await AsyncStorage.setItem('authToken', token);
//         Alert.alert('Success', 'Login successful!');
//         router.replace("/(home)"); // Navigate to the home page
//       } else {
//         Alert.alert('Error', result.message);
//       }
//     } catch (err) {
//       console.error('Error while logging in:', err);
//       Alert.alert('Error', "Please try again");
//     }
//   }

//   return (
//     <SafeAreaView
//       style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
//     >
//       <View style={{ marginTop: 50 }}>
//         <Text style={{ fontSize: 20, textAlign: "center", fontWeight: "bold" }}>
//           Food App
//         </Text>
//       </View>

//       <KeyboardAvoidingView>
//         <View style={{ alignItems: "center" }}>
//           <Text
//             style={{
//               fontSize: 17,
//               fontWeight: "bold",
//               marginTop: 12,
//               color: "red",
//             }}
//           >
//             Log in to your account
//           </Text>
//         </View>

//         <View style={{ marginTop: 70 }}>
//           <View
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               gap: 5,
//               backgroundColor: "#E0E0E0",
//               paddingVertical: 5,
//               borderRadius: 5,
//               marginTop: 30,
//             }}
//           >
//             <MaterialIcons
//               style={{ marginLeft: 8 }}
//               name="email"
//               size={24}
//               color="gray"
//             />
//             <TextInput
//               value={email}
//               onChangeText={(text) => setEmail(text)}
//               style={{ color: "gray", marginVertical: 10, width: 300 }}
//               placeholder="Enter your Email"
//             />
//           </View>

//           <View
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               gap: 5,
//               backgroundColor: "#E0E0E0",
//               paddingVertical: 5,
//               borderRadius: 5,
//               marginTop: 30,
//             }}
//           >
//             <AntDesign
//               style={{ marginLeft: 8 }}
//               name="lock1"
//               size={24}
//               color="black"
//             />
//             <TextInput
//               value={password}
//               onChangeText={(text) => setPassword(text)}
//               style={{ color: "gray", marginVertical: 10, width: 300 }}
//               placeholder="Enter your password"
//               secureTextEntry
//             />
//           </View>
//         </View>

//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "space-between",
//             marginTop: 12,
//           }}
//         >
//           <Text>Keep me Logged In</Text>
//           <Text>Forgot Password</Text>
//         </View>

//         <Pressable
//           onPress={signUpWithEmail}
//           style={{
//             width: 200,
//             backgroundColor: "#fd5c63",
//             borderRadius: 6,
//             marginLeft: "auto",
//             marginRight: "auto",
//             padding: 15,
//             marginTop: 50,
//           }}
//         >
//           <Text
//             style={{
//               textAlign: "center",
//               fontWeight: "bold",
//               fontSize: 16,
//               color: "white",
//             }}
//           >
//             Login
//           </Text>
//         </Pressable>

//         <Pressable
//           onPress={() => router.replace("/register")}
//           style={{ marginTop: 15 }}
//         >
//           <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
//             Don't have an Account? Sign Up
//           </Text>
//         </Pressable>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default Login;

// const styles = StyleSheet.create({});
