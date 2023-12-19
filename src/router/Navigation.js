import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Register from "../screens/Register";
import Home from "../screens/Home";
import Profile from "../screens/Profile"
import EditProfile from '../screens/Profile/EditProfile'
import PinCreationScreen from "../screens/PinCreationScreen";
import VerificationCodeScreen from "../screens/VerificationCodeScreen";
import Tabs from './Tabs';
import CompleteProfile from '../screens/Profile/CompleteProfile'
import OrderScreen from "../screens/History/OrderScreen";
import PaymentScreen from "../screens/History/PaymentScreen";

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="InitialScreen">
                {/* <Stack.Screen name="Login" component={Login}/> */}
                <Stack.Screen
                    name="VerificationCode"
                    component={VerificationCodeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={'Register'}
                    component={Register}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Tabs"
                    component={Tabs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={'EditProfile'}
                    component={EditProfile}
                    options={{ headerShown: false }}
                />                        
                <Stack.Screen
                  name={'CompleteProfile'}
                  component={CompleteProfile}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={'Profile'}
                    component={Profile}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={'Order'}
                    component={OrderScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={'TopUp'}
                    component={OrderScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={'Payment'}
                    component={PaymentScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
