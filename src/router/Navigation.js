import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Profile from '../screens/Profile';
import EditProfile from '../screens/Profile/EditProfile';
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
import Payment from '../screens/Payment';
import MerchantConfirm from '../screens/MerchantConfirm';
import Complete from '../screens/Complete';
import EReceipt from '../screens/EReceipt';
import Redeem from '../screens/Voucher/Redeem';
import Welcome from '../screens/Welcome';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Register from '../screens/Register';
import VerificationCodeScreen from '../screens/VerificationCodeScreen';
import PinCreationScreen from '../screens/PinCreationScreen';
import ChangePin from '../screens/Pin/ChangePin';
import CompletePaymentSpiltBill from '../screens/Payment/CompletePaymentSpiltBill';
import SendPayment from '../screens/Notification/sendPayment';
import Notification from '../screens/Notification/index';
import AddFriend from '../screens/AddFriend';
import SplitBill from '../screens/SplitBill';
import SplitBillAddPosition from '../screens/SplitBill/SplitBillAddPosition';
import SplitBillPosition from '../screens/SplitBill/SplitBillPosition';
import SplitBillSuccess from '../screens/SplitBill/SplitBillSuccess';
import SplitBillTrack from '../screens/SplitBill/SplitBillTrack';

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="InitialScreen"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen
                    name="VerificationCode"
                    component={VerificationCodeScreen}
                />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Home" component={PinCreationScreen} />
                <Stack.Screen name="Redeem" component={Redeem} />
                <Stack.Screen name="Tabs" component={Tabs} />
                <Stack.Screen name="Merchant" component={MerchantBranch} />
                <Stack.Screen name={'Menu'} component={Menu} />
                <Stack.Screen name={'MenuDetail'} component={Detail} />
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
                <Stack.Screen name={'ChangePin'} component={ChangePin} />
                <Stack.Screen name="EReceipt" component={EReceipt} />
                <Stack.Screen name="Complete" component={Complete} />
                <Stack.Screen
                    name="MerchantConfirm"
                    component={MerchantConfirm}
                />
                <Stack.Screen name="Payment" component={Payment} />
                <Stack.Screen
                    name="CompletePaymentSpiltBill"
                    component={CompletePaymentSpiltBill}
                />
                <Stack.Screen name="SendPayment" component={SendPayment} />
                <Stack.Screen name="Notification" component={Notification} />
                <Stack.Screen name="SplitBill" component={SplitBill} />
                <Stack.Screen
                    name="SplitBillAddPosition"
                    component={SplitBillAddPosition}
                />
                <Stack.Screen
                    name="SplitBillPosition"
                    component={SplitBillPosition}
                />
                <Stack.Screen
                    name="SplitBillSuccess"
                    component={SplitBillSuccess}
                />
                <Stack.Screen
                    name="SplitBillTrack"
                    component={SplitBillTrack}
                />
                 <Stack.Screen name="AddFriend" component={AddFriend} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
