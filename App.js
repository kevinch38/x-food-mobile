import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PinCreationScreen from "./src/screens/PinCreationScreen";
import VerificationCodeScreen from "./src/screens/VerificationCodeScreen";

export default function App() {
  return (
    // <PinCreationScreen/>
      <VerificationCodeScreen/>
  );
}

