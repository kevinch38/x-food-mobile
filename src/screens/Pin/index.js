import {
    Alert,
    BackHandler,
    Button,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import BackButton from '../../components/backButton';
import { theme } from '../../theme';
import { useContext, useEffect, useRef, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from '../../slices/userSlice';
import { ServiceContext } from '../../context/ServiceContext';
import { pinAction, pinCheckAction } from '../../slices/pinSlice';

function Pin({ navigation }) {
    const dispatch = useDispatch();
    const route = useRoute();
    const orderItem = route.params?.cartItems;
    const { users } = useSelector((state) => state.user);
    const { order } = useSelector((state) => state.order);
    const { pin } = useSelector((state) => state.pin);
    const [isLoading, setIsLoading] = useState(false);
    const { pinService, orderService } = useContext(ServiceContext);
    const accountID = route.params?.accountID;
    const orderID = route.params?.orderID;
    const paymentID = route.params?.paymentID;
    const destination = route.params?.destination;
    const sale = route.params?.sale;

    const input1Ref = useRef();
    const input2Ref = useRef();
    const input3Ref = useRef();
    const input4Ref = useRef();
    const input5Ref = useRef();
    const input6Ref = useRef();

    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [input4, setInput4] = useState('');
    const [input5, setInput5] = useState('');
    const [input6, setInput6] = useState('');

    useEffect(() => {
        const onGetPinUser = async () => {
            try {
                setIsLoading(true);

                await dispatch(pinAction(() => pinService.getPin(users.pinID)));

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching pin:', error);
                setIsLoading(false);
            }
        };
        onGetPinUser();
    }, [dispatch, pinService]);

    useEffect(() => {
        if (input6.length === 1) {
            const verificationCode =
                input1 + input2 + input3 + input4 + input5 + input6;

            dispatch(
                pinCheckAction(async () => {
                    try {
                        const result = await pinService.pinCheck({
                            pinID: users.pinID,
                            pin: verificationCode,
                        });


                        if (result.data) {
                            destination === 'Payment'
                                ? navigation.navigate('Payment', {
                                      accountID: accountID,
                                      orderID: orderID,
                                  })
                                : navigation.navigate(
                                      'CompletePaymentSpiltBill', {
                                    }
                                  );
                        } else {
                            Alert.alert(
                                'Verifikasi gagal',
                                'Kode verifikasi salah.',
                            );
                        }
                    } catch (error) {
                        Alert.alert(
                            'Verifikasi gagal 1',
                            'Kode verifikasi salah.',
                        );
                    }
                }),
            );
        }
    }, [input6]);
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => true,
        );
        return () => backHandler.remove();
    }, []);

    const handleTextChange = (
        text,
        nextInputRef,
        prevInputRef,
        currentStateSetter,
    ) => {
        currentStateSetter(text);

        if (text.length === 0 && prevInputRef && prevInputRef.current) {
            prevInputRef.current.focus();
        } else if (text.length === 1 && nextInputRef && nextInputRef.current) {
            nextInputRef.current.focus();
        }
    };

    const handleBack = () => {
        navigation.goBack();
    };

    const renderHeader = () => {
        return (
            <View>
                <BackButton onPress={handleBack} />
            </View>
        );
    };

    const renderPin = () => {
        return (
            <View>
                <View style={styles.imageController}>
                    <Image
                        style={styles.imageHeader}
                        source={require('../../assets/images/pin-image.png')}
                    />
                    <Text style={styles.title}>Payment Verification</Text>
                    <Text style={styles.subTitle}>
                        Verify 6-digit security PIN
                    </Text>
                </View>
                <View style={styles.inputPin}>
                    <TextInput
                        ref={input1Ref}
                        style={styles.textInputStyle}
                        secureTextEntry={true}
                        maxLength={1}
                        autoFocus={true}
                        keyboardType={'numeric'}
                        onChangeText={(text) =>
                            handleTextChange(text, input2Ref, null, setInput1)
                        }
                    />
                    <TextInput
                        ref={input2Ref}
                        style={styles.textInputStyle}
                        secureTextEntry={true}
                        maxLength={1}
                        keyboardType={'numeric'}
                        onChangeText={(text) =>
                            handleTextChange(
                                text,
                                input3Ref,
                                input1Ref,
                                setInput2,
                            )
                        }
                    />
                    <TextInput
                        ref={input3Ref}
                        style={styles.textInputStyle}
                        secureTextEntry={true}
                        maxLength={1}
                        keyboardType={'numeric'}
                        onChangeText={(text) =>
                            handleTextChange(
                                text,
                                input4Ref,
                                input2Ref,
                                setInput3,
                            )
                        }
                    />
                    <TextInput
                        ref={input4Ref}
                        style={styles.textInputStyle}
                        secureTextEntry={true}
                        maxLength={1}
                        keyboardType={'numeric'}
                        onChangeText={(text) =>
                            handleTextChange(
                                text,
                                input5Ref,
                                input3Ref,
                                setInput4,
                            )
                        }
                    />
                    <TextInput
                        ref={input5Ref}
                        style={styles.textInputStyle}
                        secureTextEntry={true}
                        maxLength={1}
                        keyboardType={'numeric'}
                        onChangeText={(text) =>
                            handleTextChange(
                                text,
                                input6Ref,
                                input4Ref,
                                setInput5,
                            )
                        }
                    />
                    <TextInput
                        ref={input6Ref}
                        style={styles.textInputStyle}
                        secureTextEntry={true}
                        maxLength={1}
                        keyboardType={'numeric'}
                        onChangeText={(text) =>
                            handleTextChange(text, null, input5Ref, setInput6)
                        }
                    />
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.controller}>
            {/*<Button title={'tt'} onPress={console.log(order, 'di pin')} />*/}
            <View>
                {renderHeader()}
                {renderPin()}
            </View>
            <TouchableOpacity style={styles.buttonForgotPin}>
                <Text style={styles.textForgotPin}>Forget PIN?</Text>
            </TouchableOpacity>
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
export default Pin;
