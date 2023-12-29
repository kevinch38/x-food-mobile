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
import { setPhoneNumber } from '../../slices/uiSlice';
import { selectUserByPhoneNumberAction } from '../../slices/userSlice';
import { ServiceContext } from '../../context/ServiceContext';
import { useRoute } from '@react-navigation/native';

export default function Login({ navigation }) {
    const schema = Yup.object({
        phoneNumber: Yup.string()
            .matches(/^\d+$/, 'Invalid Phone Number')
            .min(10, 'Phone Number must be at least 10 digits')
            .max(16, 'Phone Number must be at most 16 digits')
            .required('Phone Number is required'),
    });

    const dispatch = useDispatch();
    const { userService } = useContext(ServiceContext);
    const phoneNumberRedux = useSelector((state) => state.ui.phoneNumber);
    const [isRegistered, setIsRegistered] = useState(false);

    const {
        values: { phoneNumber },
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
    } = useFormik({
        initialValues: {
            phoneNumber: phoneNumberRedux,
        },
        onSubmit: async (values) => {
            const user = await userService.fetchUserByPhoneNumber(
                values.phoneNumber,
            );
            console.log(user.data.phoneNumber);
            if (user) {
                setIsRegistered(true);
                console.log("values.phoneNumber");
            } else {
                setIsRegistered(false);
                dispatch(
                    userAction(async (values) => {
                        await userService.register(values.phoneNumber);
                    }),
                );
            }

            dispatch(setPhoneNumber(values.phoneNumber));
            navigation.navigate('VerificationCode', { isRegistered });
            // console.log(phoneNumber);
            // console.log(isRegistered);
        },
        validationSchema: schema,
    });

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
                        placeholder="(+62)"
                        keyboardType="phone-pad"
                        onChangeText={handleChange('phoneNumber')}
                        onBlur={handleBlur('phoneNumber')}
                        value={phoneNumber}
                        defaultValue="+62"
                    >
                        {/* {console.log(phoneNumber)} */}
                    </TextInput>
                    {errors.phoneNumber && (
                        <Text style={styles.errorText}>
                            {errors.phoneNumber}
                        </Text>
                    )}
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
    errorText: {
        color: 'red',
        marginTop: 5,
    },
});
