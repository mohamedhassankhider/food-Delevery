import React, { useState } from "react";
import { MaterialIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, Alert, KeyboardAvoidingView, Pressable, SafeAreaView, TextInput, View, StyleSheet } from "react-native";
import { endpoints } from '../../apiConfig';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const signUpNewUser = async () => {
    try {
      const response = await fetch(endpoints.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Registration successful!');
        router.replace("/login");
      } else {
        Alert.alert('Error', result.message || 'Registration failed.');
      }
    } catch (err) {
      console.error('Error while registering:', err);
      Alert.alert('Error', 'Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Food App</Text>
      </View>

      <KeyboardAvoidingView>
        <View style={styles.centered}>
          <Text style={styles.subHeaderText}>Register to your account</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Ionicons name="person" size={24} color="gray" style={styles.icon} />
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.textInput}
              placeholder="Enter your Name"
            />
          </View>

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

        <Pressable onPress={signUpNewUser} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>

        <Pressable onPress={() => router.replace("/login")} style={styles.link}>
          <Text style={styles.linkText}>Already have an Account? Sign In</Text>
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

export default Register;


// import React, { useState } from "react";
// import { MaterialIcons, Ionicons } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { Text, Alert, KeyboardAvoidingView, Pressable, SafeAreaView, TextInput, View, StyleSheet } from "react-native";



// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();
//   const [result, setResult] = useState(

//   );

//   async function signUpNewUser() {
//     try {
//       const response = await fetch('http://192.168.3.174:5000/createAccount',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ name, email, password }),
//         });

//       if (response.ok) {
//         setResult(await response.json());
//         Alert.alert('Success', result);
//         router.replace("/login"); // Navigate to the login page after successful registration
//       } else {
//         Alert.alert('Error', result);
//       }
//     } catch (err) {
//       console.error('Error while registering:', err);
//       Alert.alert('Error', err);
//     }
//   }

//   return (
//     <SafeAreaView
//       style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
//     >
//       <View style={{ marginTop: 50 }}>
//         <Text style={styles.text}>
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
//             Register to your account
//           </  Text>
//         </  View>

//         <  View style={{ marginTop: 70 }}>
//           <  View
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
//             <Ionicons
//               name="person"
//               size={24}
//               color="gray"
//               style={{ marginLeft: 8 }}
//             />
//             <  TextInput
//               value={name}
//               onChangeText={(text) => setName(text)}
//               style={{ color: "gray", marginVertical: 10, width: 300 }}
//               placeholder="Enter your Name"
//             />
//           </  View>
//           <  View
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
//             <  TextInput
//               value={email}
//               onChangeText={(text) => setEmail(text)}
//               style={{ color: "gray", marginVertical: 10, width: 300 }}
//               placeholder="Enter your Email"
//             />
//           </  View>

//           <  View
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
//             <  TextInput
//               value={password}
//               onChangeText={(text) => setPassword(text)}
//               style={{ color: "gray", marginVertical: 10, width: 300 }}
//               placeholder="Enter your password"
//               secureTextEntry
//             />
//           </  View>
//         </  View>

//         <  Pressable
//           onPress={signUpNewUser}
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
//           <  Text
//             style={{
//               textAlign: "center",
//               fontWeight: "bold",
//               fontSize: 16,
//               color: "white",
//             }}
//           >
//             Register
//           </  Text>
//         </  Pressable>

//         <  Pressable
//           onPress={() => router.replace("/login")}
//           style={{ marginTop: 15 }}
//         >
//           <  Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
//             Already have an Account? Sign In
//           </  Text>
//         </  Pressable>
//       </  KeyboardAvoidingView>
//     </  SafeAreaView>
//   );
// };

// export default Register;

// const styles = StyleSheet.create({
//   text: {
//     fontSize: 20,
//     textAlign: "center",
//     fontWeight: "bold"
//   },
// });
