import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Register from "../screens/Register";
import Home from "../screens/Home";
import Profile from "../screens/Profile"
import EditProfile from '../screens/Profile/EditProfile'
import PinCreationScreen from "../screens/PinCreationScreen";
import VerificationCodeScreen from "../screens/VerificationCodeScreen";

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Login" component={Login}/> */}
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
          name={'Profile'}
          component={Profile}
          options={{ headerShown: false }}
                />
          <Stack.Screen
              name={'PinCreation'}
              component={PinCreationScreen}
              options={{ headerShown: false }}
          />
          <Stack.Screen
              name={'VerificationCode'}
              component={VerificationCodeScreen}
              options={{ headerShown: false }}
          />
          <Stack.Screen name={'EditProfile'} component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
