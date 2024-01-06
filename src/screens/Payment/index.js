import {
    Alert,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { theme } from '../../theme';
import * as Progress from 'react-native-progress';
import { useRoute } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ServiceContext } from '../../context/ServiceContext';
import { completeOrderAction } from '../../slices/orderSlice';

function Payment({ navigation }) {
    const dispatch = useDispatch();
    const { orderService } = useContext(ServiceContext);
    const route = useRoute();
    const accountID = route.params?.accountID;
    const orderID = route.params?.orderID;
    const [paymentCompleted, setPaymentCompleted] = useState(false); // Track payment completion

    useEffect(() => {
        const completeOrder = async () => {
            try {
                const response = await orderService.completedOrder({
                    accountID: accountID,
                    orderID: orderID,
                });
                if (response.statusCode === 201) {
                    setPaymentCompleted(true);
                    navigation.navigate('MerchantConfirm', {
                        data: response.data,
                    });
                } else {
                    alert('Balance anda kurang');
                    navigation.navigate('Tabs');
                }
            } catch (e) {
                Alert.alert(
                    'Balance',
                    'Your balance is not sufficient',
                    [
                        {
                            text: 'Ok',
                            onPress: () => {
                                navigation.navigate('Tabs');
                            },
                        },
                    ],
                    { cancelable: false },
                );
            }
        };

        dispatch(completeOrderAction(completeOrder));
    }, [dispatch, orderService]);

    const renderLoading = () => {
        if (!paymentCompleted) {
            return (
                <View style={{ alignItems: 'center', marginTop: '20%' }}>
                    <Progress.Circle
                        size={150}
                        endAngle={0.7}
                        strokeCap={'round'}
                        borderWidth={12}
                        indeterminate={true}
                        width={150}
                        color={'#F24E1E'}
                    />
                </View>
            );
        }
        return null;
    };
    const renderHeader = () => {
        return (
            <View style={styles.imageController}>
                <Image
                    style={styles.imageHeader}
                    source={require('../../assets/images/pin-image.png')}
                />
                <Text style={styles.title}>Processing Your Payment</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.controller}>
            <View>
                {renderHeader()}
                {renderLoading()}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    controller: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#fff',
    },
    imageController: {
        alignItems: 'center',
    },
    imageHeader: {
        width: 102,
        height: 93,
        marginTop: 46,
        marginBottom: 44,
    },
    title: {
        width: '80%',
        textAlign: 'center',
        fontWeight: '300',
        fontSize: 30,
    },
    subTitle: {
        fontWeight: '400',
        fontSize: 16,
        color: theme.primary,
    },
    inputPin: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    textInputStyle: {
        width: 54,
        height: 54,
        borderColor: theme.grey,
        borderWidth: 1,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 27,
        fontWeight: '500',
        color: theme.primary,
        marginTop: 62,
    },
    buttonForgotPin: {
        marginTop: 20,
        marginLeft: 31,
    },
    textForgotPin: {
        color: theme.primary,
        fontSize: 16,
        fontWeight: '600',
    },
});
export default Payment;
