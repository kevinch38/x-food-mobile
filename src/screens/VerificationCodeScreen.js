
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, View, Pressable, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Color from '../assets/Color';
import BackButton from '../components/backButton';
import UserService from '../services/UserService';
import axios from "axios"; // Import UserService
import { useSelector } from 'react-redux';

const VerificationCodeScreen = () => {
    const phoneNumber = useSelector((state) => state.ui.phoneNumber);
    const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
    const [focusedInput, setFocusedInput] = useState(null);
    const [isValidCode, setIsValidCode] = useState(true);
    const [otpID, setOtpID] = useState(null);
    const [firstName, setFirstName] = useState("")
    const navigation = useNavigation();
    const route = useRoute();
    const userService = UserService();

    useEffect(() => {
        fetchOtpID(phoneNumber);
    }, [phoneNumber]);

    const fetchOtpID = async (phoneNumber) => {
        try {
            const userData = await userService.fetchUserByPhoneNumber(phoneNumber);

            if (userData && userData.data.otpID) {
                setFirstName(userData.data.firstName);
                setOtpID(userData.data.otpID);
            } else {
                console.error('Error fetching user data or otpID is null:', userData);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleInputChange = (text, index) => {
        const updatedCode = [...verificationCode];
        updatedCode[index] = text;
        setVerificationCode(updatedCode);

        const enteredCode = updatedCode.join('');
        checkOTP(enteredCode);
    };

    const checkOTP = async (enteredCode) => {
        try {
            if (otpID) {
                const response = await axios.post('http://10.0.2.2:8087/api/otp', {
                    otpID: otpID,
                    enteredOtp: enteredCode,
                });
                console.log("=======================================")
                console.log(response.data)
                const data = response.data;

                if (data.data && firstName === "") {
                    setIsValidCode(true);
                    navigation.navigate('Register');  // Pindah ke Register jika firstName kosong
                } else if (data.data && firstName !== "") {
                    setIsValidCode(true);
                    navigation.navigate('Tabs');  // Pindah ke VerificationCode jika firstName sudah terisi
                } else {
                    setIsValidCode(false);
                }

            } else {
                console.error('otpID is null');
            }
        } catch (error) {
            console.error('Error fetching OTP data:', error);
        }
    };

    const handleInputFocus = (index) => {
        setFocusedInput(index);
    };

    const handleInputBlur = () => {
        setFocusedInput(null);
    };


    return (

        <View style={{ flex: 1, justifyContent: 'center', padding: 30 }}>
            <Image source={require('../../assets/images/elipse3.png')} style={{ position: 'absolute', top: 0 }} />
            <Image source={require('../../assets/images/elipse.png')} style={{ position: 'absolute', top: 0 }} />
            <TouchableOpacity style={style.buttonImage}>
                <Image source={require('../../assets/images/button.png')} />
            </TouchableOpacity>

            <Image source={require('../../assets/images/elipse2.png')} style={{ position: 'absolute', top: 0, right: 0 }} />

            <Text style={{ fontSize: 37, textAlign: 'left', marginBottom: 5 }}>Verification Code</Text>
            <Text style={{ textAlign: 'left', marginBottom: 20, fontSize: 14, color: '#9796A1' }}>
                Please type the verification code sent to {'\n'} +62xxxxxxxxxxx
            </Text>
            <View style={style.container}>
                {verificationCode.map((value, index) => (
                    <TextInput
                        key={index}
                        style={[
                            style.input,
                            {
                                borderColor: focusedInput === index ? Color.primary : '#000000',
                                borderWidth: focusedInput === index ? 1 : 0.3
                            },
                        ]}
                        secureTextEntry={true}
                        keyboardType={'numeric'}
                        maxLength={1}
                        value={value}
                        onChangeText={(text) => handleInputChange(text, index)}
                        onFocus={() => handleInputFocus(index)}
                        onBlur={handleInputBlur}
                    />
                ))}
            </View>
            {!isValidCode && (
                <Text style={{ color: 'red', marginTop: 10, textAlign:"center" }}>Wrong Code. try again.</Text>
            )}
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                <Text style={{ fontSize: 16 }}>I don’t receive a code!</Text>
                <Pressable onPress={() => console.log('Resend pressed')}>
                    <Text style={{ fontSize: 16, color: '#F08D18', marginLeft: 5 }}>Please resend</Text>
                </Pressable>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    input: {
        height: 65,
        margin: 10,
        color: Color.primary,
        fontSize: 40,
        width: 65,
        borderWidth: 0.5,
        padding: 5,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        textAlign: 'center',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
    },

    buttonImage: {
        position: 'absolute',
        top: 20,

    },
});

export default VerificationCodeScreen;






