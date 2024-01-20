import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Buffer } from 'buffer';
import { useNavigation } from '@react-navigation/native';

export default function ExpiredToken({ navigation }) {
    const [isValid, setIsValid] = useState(false);
    const [token, setToken] = useState('');

    const checkTokenValidity = (token) => {
        if (token) {
            try {
                const payloadBase64 = token.split('.')[1];
                const payloadASCII = Buffer.from(
                    payloadBase64,
                    'base64',
                ).toString('ascii');
                const payloadObject = JSON.parse(payloadASCII);
                const expiryTimestamp = payloadObject.exp;
                const currentTimestamp = Math.floor(Date.now() / 1000);
                setIsValid(expiryTimestamp < currentTimestamp);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setToken(await AsyncStorage.getItem('token'));
            checkTokenValidity(await AsyncStorage.getItem('token'));
        };
        fetchData();
    }, []);

    return (
        true &&
        Alert.alert(
            'Log out',
            'Token has expired',
            [
                {
                    text: 'Log out',
                    onPress: async () => {
                        navigation.navigate('Login');
                        await AsyncStorage.removeItem('phoneNumber');
                        await AsyncStorage.removeItem('token');
                    },
                },
            ],
            { cancelable: false },
        )
    );
}
