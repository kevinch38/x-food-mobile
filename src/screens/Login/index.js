import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';
import Template from '../../components/background';
import Color from '../../assets/Color';
import { StatusBar } from 'expo-status-bar';
import * as Yup from 'yup';

export default function Login({ navigation }) {
    const schema = Yup.object({
        phoneNumber: Yup.string()
            .max(15, 'Phone Number must be less than 15')
            .required('Phone Number is required'),
    });
    const [phoneNumber, setPhoneNumber] = useState('');
    const handleClick = () => {};

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
                        // value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    >
                        {console.log(phoneNumber)}
                        +62
                    </TextInput>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={styles.textButton}>
                            Receive OTP via SMS
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.textAlready}>
                        Already have an account?{' '}
                        <Text style={{ color: Color.primary }}>Login</Text>
                    </Text>
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
    textAlready: {
        alignSelf: 'center',
        marginVertical: '50%',
    },
});
