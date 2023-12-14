import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Register from "../screens/Register";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import EditProfile from "../screens/Profile/EditProfile";
import Login from "../screens/Login";
import Splash from "../screens/Splash";
import Welcome from "../screens/Welcome";

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"Profile"}
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={"EditProfile"} component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
