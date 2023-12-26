import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Template from '../../components/background';
import Color from '../../assets/Color';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { selectedUserPhoneNumberAction } from '../../slices/uiSlice';
import { ServiceContext } from '../../context/ServiceContext';
import { AsyncStorage } from 'react-native';
import { authAction } from '../../slices/authSlice';

export default function Login({ navigation }) {
    const schema = Yup.object({
        phoneNumber: Yup.string()
            .matches(/^\d+$/, 'Invalid Phone Number')
            .min(10, 'Phone Number must be at least 10 digits')
            .max(16, 'Phone Number must be at most 16 digits')
            .required('Phone Number is required'),
    });

    const dispatch = useDispatch();
    // const [phoneNumber, setPhoneNumber] = useState('');
    const { authService } = useContext(ServiceContext);

    const {
        values: { phoneNumber },
        errors,
        dirty,
        isValid,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useFormik({
        initialValues: {
            phoneNumber: '',
        },
        onSubmit: async (values) => {
            dispatch(
                authAction(async () => {
                    const result = await authService.login(values);
                    if (result.statusCode === 200) {
                        AsyncStorage.setItem('token', result.data.token);
                        navigation.navigate('Register');
                    }
                    const resultInfo = await authService.getUserInfo();
                    return resultInfo;
                }),
            );
        },
        validationSchema: schema,
    });

    useEffect(() => {
        const onGetUserInfo = async () => {
            const result = await authService.getUserInfo();
            if (result.statusCode === 200) {
                navigation.navigate('Register')
            }
            return result;
        };
        onGetUserInfo();
    }, [authService, navigation.navigate]);

    const user = useSelector(
        (state) => state.user.selectedUserPhoneNumberAction,
    );

    const handleClick = async () => {
        try {
            await dispatch(selectedUserPhoneNumberAction(phoneNumber));
            if (user) {
                navigation.navigate('Home');
            } else {
                navigation.navigate('Register');
            }
        } catch (error) {
            console.error('Error checking phone number:', error.message);
        }
    };

    return (
        <SafeAreaView style={styles.wrapper}>
            <Template />
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 55,
                }}
            >
                <View>
                    <Text style={styles.textLogin}>Sign Up/Login</Text>
                    <Text style={styles.textPhoneNumber}>Phone Number</Text>
                    <TextInput
                        style={styles.phoneNumberInput}
                        placeholder="+62"
                        keyboardType="phone-pad"
                        onChangeText={handleChange('phoneNumber')}
                        onBlur={handleBlur('phoneNumber')}
                        value={phoneNumber}
                        defaultValue='(+62)'
                    >
                        {console.log(phoneNumber)}
                        
                    </TextInput>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.textButton}>
                            Receive OTP via SMS
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        height: '100%',
        backgroundColor: '#fff',
    },
    textLogin: {
        fontSize: 35,
        fontWeight: 'bold',
        marginTop: '30%',
    },
    textPhoneNumber: {
        marginTop: '30%',
        color: Color.gray,
    },
    phoneNumberInput: {
        height: 60,
        marginTop: 15,
        borderWidth: 1,
        borderColor: Color.gray,
        borderRadius: 10,
        padding: 10,
    },
    textButton: {
        fontWeight: 'bold',
        color: 'white',
    },
    button: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.primary,
        padding: 10,
        margin: '5%',
        borderRadius: 40,
        height: 50,
        width: 240,
    },
});
