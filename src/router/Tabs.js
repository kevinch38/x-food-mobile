import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';
import { Image } from 'react-native';
import History from '../screens/History';
import Voucher from '../screens/Voucher';
import AddFriend from '../screens/AddFriend';
import Home from '../screens/Home';
import PinCreationScreen from '../screens/PinCreationScreen';

const Tab = createBottomTabNavigator();

export default () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: '#e91e63',
                tabBarHideOnKeyboard: 'true',
            }}
        >
            <Tab.Screen
                name="Home"
                component={PinCreationScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: '',
                    tabBarIcon: () => (
                        <Image
                            style={{ width: 38, height: 38, marginTop: '15%' }}
                            source={require('../assets/icons/direction.png')}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Voucher"
                component={Voucher}
                options={{
                    headerShown: false,
                    tabBarLabel: '',
                    tabBarIcon: () => (
                        <Image
                            style={{ width: 37, height: 37, marginTop: '15%' }}
                            source={require('../assets/icons/coupon.png')}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="History"
                component={History}
                options={{
                    headerShown: false,
                    tabBarLabel: '',
                    tabBarIcon: () => (
                        <Image
                            style={{ width: 38, height: 37, marginTop: '15%' }}
                            source={require('../assets/icons/history.png')}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerShown: false,
                    tabBarLabel: '',
                    tabBarIcon: () => (
                        <Image
                            style={{ width: 38, height: 38, marginTop: '15%' }}
                            source={require('../assets/icons/profile.png')}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};
