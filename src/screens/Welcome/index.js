import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import image from "../../assets/images/welcome.png";
import imageGradataion from "../../assets/images/gradation.png";
import Color from "../../assets/Color";

export default function Welcome({navigation}) {
  const onClick = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View>
        <Image style={styles.image} source={image} />
        <Image source={imageGradataion} style={styles.image} />
      </View>
      <View style={styles.layout}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.xfoodText}>X-Food</Text>
        <Text style={styles.yourText}>Your Future Food Companion</Text>
        <Text style={styles.loginText}>
          <View style={styles.line}></View>
          Sign Up/Login
          <View style={styles.line}></View>
        </Text>
        <TouchableOpacity style={styles.button} onPress={onClick}>
          <Text style={styles.textButton}>Use phone number</Text>
        </TouchableOpacity>
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
  layout: {
    padding: "5%",
  },
  image: {
    position: "absolute",
    width: 420,
    height: 1000,
    objectFit: "cover",
  },
  welcomeText: {
    fontSize: 35,
    fontWeight: "bold",
    marginTop: 160,
  },
  xfoodText: {
    fontSize: 35,
    color: Color.primary,
  },
  button: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: 10,
    margin: "5%",
    borderRadius: 40,
    borderBlockColor: "black",
    height: "8%",
    width: "85%",
  },
  textButton: {
    fontWeight: "bold",
    color: "white",
  },
  loginText: {
    alignSelf: "center",
    paddingTop: "80%",
    color: "white",
  },
  yourText: {
    color: "white",
  },
  line: {
    height: 1,
    backgroundColor: "white",
    width: "100%",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
  },
});
