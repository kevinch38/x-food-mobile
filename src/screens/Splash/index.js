import { CommonActions } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import color from "../../assets/Color";
import image from "../../assets/images/logo-splash.png";

export default function Splash({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Welcome" }],
        })
      );
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.logo} />
      <Text style={styles.title}>
        X<Text style={styles.secondTitle}>-Food</Text>
      </Text>
      <Text style={styles.teksColor}>
        Powered by
        <Text style={{ fontWeight: "bold" }}> Bank Danamon Indonesia</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.primary,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  title: {
    marginTop: 20,
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  teksColor: {
    color: "#FFFFFF",
  },
  secondTitle: {
    color: "rgba(255, 255, 255, 0.5)",
  },
});
