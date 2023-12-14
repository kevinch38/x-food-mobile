import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import Template from "../../components/background";
import Color from "../../assets/Color";
import { StatusBar } from "expo-status-bar";

export default function Login() {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Template />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 55,
        }}
      >
        <View>
          <Text style={styles.textLogin}>Sign Up/Login</Text>
          <Text style={styles.textPhoneNumber}>Phone Number</Text>
          <TextInput
            style={styles.phoneNumberInput}
            placeholder="+62"
            keyboardType="phone-pad"
          >
            +62
          </TextInput>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton}>Receive OTP via SMS</Text>
          </TouchableOpacity>
          <Text style={styles.textAlready}>
            Already have an account?{" "}
            <Text style={{ color: Color.primary }}>Login</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    height: "100%",
    backgroundColor: "#fff",
  },
  textLogin: {
    fontSize: 35,
    fontWeight: "bold",
    marginTop: "30%",
  },
  textPhoneNumber: {
    marginTop: "30%",
    color: Color.gray,
  },
  phoneNumberInput: {
    height: 60,
    marginTop: 15,
    borderWidth: 1,
    borderColor: Color.gray,
    borderRadius: 10,
    padding: 10,
  },
  textButton: {
    fontWeight: "bold",
    color: "white",
  },
  button: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.primary,
    padding: 10,
    margin: "5%",
    borderRadius: 40,
    height: 50,
    width: 240,
  },
  textAlready: {
    alignSelf: "center",
    marginVertical: "50%",
  },
});
