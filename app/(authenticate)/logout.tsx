import React from 'react';
import { Alert, Pressable, Text, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import { endpoints } from '../../apiConfig';

const LogoutButton = () => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const logout = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Error', 'No authentication token found.');
        return;
      }
      
      const response = await fetch(endpoints.logout, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();

        if (response.ok) {
          await AsyncStorage.removeItem('authToken');
          Alert.alert('Success', result.message);
          router.replace("/login");
        } else {
          Alert.alert('Error', result.message || 'An error occurred while logging out.');
        }
      } else {
        const text = await response.text();
        Alert.alert('Error', `Unexpected response format: ${text}`);
      }
    } catch (err) {
      console.error('Error during logout:', err);
      Alert.alert('Error', 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Pressable onPress={logout} style={styles.button} disabled={loading}>
      <View style={styles.iconContainer}>
        <AntDesign name="logout" size={20} color="#fff" />
      </View>
      <Text style={styles.buttonText}>{loading ? 'Logging out...' : 'Logout'}</Text>
    </Pressable>
  );
};


const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200ee', // Material Design primary color
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    margin: 8,
  },
  iconContainer: { marginRight: 8 },
  buttonText: { fontSize: 14, color: '#fff', fontWeight: '500' },
});

export default LogoutButton;



// import React from 'react';
// import { Alert, Pressable, Text, StyleSheet, View } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useRouter } from "expo-router";
// import AntDesign from '@expo/vector-icons/AntDesign';

// const url = "http://192.168.3.51:5000"; // Your backend URL

// const LogoutButton = () => {
//   const router = useRouter();

//   const logout = async () => {
//     try {
//       const response = await fetch(`${url}/logout`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${await AsyncStorage.getItem('authToken')}`,
//         },
//       });

//       const contentType = response.headers.get('content-type');
//       if (contentType && contentType.includes('application/json')) {
//         const result = await response.json();

//         if (response.ok) {
//           // Clear client-side token
//           await AsyncStorage.removeItem('authToken');
//           Alert.alert('Success', result.message);
//           // Redirect to login page
//           router.replace("/login");
//         } else {
//           Alert.alert('Error', result.message || 'An error occurred while logging out.');
//         }
//       } else {
//         const text = await response.text();
//         Alert.alert('Error', `Unexpected response format: ${text}`);
//       }
//     } catch (err) {
//       console.error('Error during logout:', err);
//       Alert.alert('Error', 'An error occurred. Please try again.');
//     }
//   };

//   return (
//     <Pressable onPress={logout} style={styles.button}>
//       <View style={styles.iconContainer}>
//         <AntDesign name="logout" size={20} color="#fff" />
//       </View>
//       <Text style={styles.buttonText}>Logout</Text>
//     </Pressable>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#6200ee', // Material Design primary color
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 24,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     margin: 8,
//   },
//   iconContainer: {
//     marginRight: 8,
//   },
//   buttonText: {
//     fontSize: 14,
//     color: '#fff',
//     fontWeight: '500',
//   },
// });

// export default LogoutButton;
