import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Login from '../screens/Login';
import Splash from '../screens/Splash';
import Welcome from '../screens/Welcome';
import Register from "../screens/Register";
import Profile from "../screens/Profile"
import EditProfile from '../screens/Profile/EditProfile'
import PinCreationScreen from "../screens/PinCreationScreen";
import VerificationCodeScreen from "../screens/VerificationCodeScreen";
import Tabs from './Tabs';
import CompleteProfile from '../screens/Profile/CompleteProfile'
import OrderScreen from "../screens/History/OrderScreen";
import PaymentScreen from "../screens/History/PaymentScreen";
import History from "../screens/History";
import MerchantBranch from '../screens/MerchantBranch';
import Menu from '../screens/Menu';
import Detail from '../screens/Menu/Detail';

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="InitialScreen">
                
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
                    name="VerificationCode"
                    component={VerificationCodeScreen} 
                    options={{ headerShown: false }}
                    />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Tabs"
                    component={Tabs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Merchant"
                    component={MerchantBranch}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={'Menu'}
                    component={Menu}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={'MenuDetail'}
                    component={Detail}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={'Profile'}
                    component={Profile}
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
                    name={'History'}
                    component={History}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
