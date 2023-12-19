import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Register from '../screens/Register';
import Profile from '../screens/Profile';
import EditProfile from '../screens/Profile/EditProfile';
import VerificationCodeScreen from '../screens/VerificationCodeScreen';
import Tabs from './Tabs';
import CompleteProfile from '../screens/Profile/CompleteProfile';
import History from '../screens/History';
import TopUp from '../screens/TopUp';
import SelectPayment from '../screens/TopUp/SelectPayment';

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="InitialScreen"
                screenOptions={{ headerShown: false }}
            >
                {/* <Stack.Screen name="Login" component={Login}/> */}
                <Stack.Screen
                    name="VerificationCode"
                    component={VerificationCodeScreen}
                />
                <Stack.Screen name={'Register'} component={Register} />
                <Stack.Screen name="Tabs" component={Tabs} />
                <Stack.Screen name={'Profile'} component={Profile} />
                <Stack.Screen name={'EditProfile'} component={EditProfile} />
                <Stack.Screen
                    name={'CompleteProfile'}
                    component={CompleteProfile}
                />
                <Stack.Screen name={'History'} component={History} />
                <Stack.Screen name={'TopUp'} component={TopUp} />
                <Stack.Screen
                    name={'SelectPayment'}
                    component={SelectPayment}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
