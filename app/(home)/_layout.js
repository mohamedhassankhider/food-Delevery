import { Header } from "react-native/Libraries/NewAppScreen";

const { Stack } = require("expo-router")


export default function Layout() {
    return (
        <Stack screenOptions={{ headerShown: false}}>
            <Stack.Screen name="index"/> 
                    
        </Stack>
    );
    
}