import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Login from '../screens/Login';
import Splash from '../screens/Splash';
import Welcome from '../screens/Welcome';
import Register from '../screens/Register';
import Profile from '../screens/Profile';
import EditProfile from '../screens/Profile/EditProfile';
import PinCreationScreen from '../screens/PinCreationScreen';
import VerificationCodeScreen from '../screens/VerificationCodeScreen';
import Tabs from './Tabs';
import CompleteProfile from '../screens/Profile/CompleteProfile';
import History from '../screens/History';
import TopUp from '../screens/TopUp';
import SelectPayment from '../screens/TopUp/SelectPayment';
import Cart from '../screens/Cart';
import Pin from '../screens/Pin';
import MerchantBranch from '../screens/MerchantBranch';
import Menu from '../screens/Menu';
import Detail from '../screens/Menu/Detail';
import Redeem from '../screens/Voucher/Redeem';

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="InitialScreen"
                screenOptions={{ headerShown: false }}
            >
                {/*<Stack.Screen name="Splash" component={Splash} />*/}
                {/*<Stack.Screen name="Welcome" component={Welcome} />*/}
                {/*<Stack.Screen name="Login" component={Login} />*/}
                {/*<Stack.Screen*/}
                {/*    name="VerificationCode"*/}
                {/*    component={VerificationCodeScreen}*/}
                {/*/>*/}
                {/*<Stack.Screen name="Register" component={Register} />*/}
                {/*<Stack.Screen name="Home" component={PinCreationScreen} />*/}
                {/*<Stack.Screen name="Redeem" component={Redeem} />*/}
                {/*<Stack.Screen name="Tabs" component={Tabs} />*/}
                {/*<Stack.Screen name="Merchant" component={MerchantBranch} />*/}
                {/*<Stack.Screen name={'Menu'} component={Menu} />*/}
                {/*<Stack.Screen name={'MenuDetail'} component={Detail} />*/}
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
                <Stack.Screen
                    name={'Cart'}
                    component={Cart}
                    options={{ presentation: 'modal' }}
                />
                <Stack.Screen
                    name={'Pin'}
                    options={{ presentation: 'modal' }}
                    component={Pin}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
