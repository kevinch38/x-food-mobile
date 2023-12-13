import { View, Text, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import React from "react";

const Home = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View>
        <Text>Home</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    height: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
