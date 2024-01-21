import React, { useState, useEffect, useRef } from 'react';
import {
    Alert,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import BackButton from '../../components/backButton';
import { theme } from '../../theme';
import Color from '../../assets/Color';
import { useSelector } from 'react-redux';
import PinService from '../../services/PinService';

function ChangePin({ navigation }) {
    const [isFocused, setIsFocused] = useState(true);
    const { users } = useSelector((state) => state.user);
    const pinService = PinService();

    const [pinInputs, setPinInputs] = useState(['', '', '', '', '', '']);

    useEffect(() => {
        setTimeout(() => {
            inputRefs[0].current.focus();
        }, 0);
    }, []);

   const handleFocus = (index) => {
       setIsFocused(index);
   };

    const handleBlur = () => {
        setIsFocused(null);
    };

    const inputRefs = [
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef(),
    ];

    const handleTextChange = (text, index) => {
        const newPinInputs = [...pinInputs];
        newPinInputs[index] = text;
        setPinInputs(newPinInputs);

        if (text.length === 1 && index < inputRefs.length - 1) {
            inputRefs[index + 1].current.focus();
        } else if (text.length === 0 && index > 0) {
            inputRefs[index - 1].current.focus();
        }
    };

    const checkPin = async () => {
        try {
            const verificationCode = pinInputs.join('');
            if (pinInputs[5].length === 1) {
                const result = await pinService.pinCheck({
                    pinID: users.pinID,
                    pin: verificationCode,
                });
                if (result.data) {
                    navigation.navigate('SetupNewPin');
                } else {
                    Alert.alert('Verifikasi gagal', 'Kode verifikasi salah.');
                }
            }
        } catch (error) {
            console.error('Error during pinCheck:', error);
        }
    };

    const renderHeader = () => {
        return (
            <View>
                <BackButton onPress={() => navigation.goBack()} />

                <View style={styles.imageController}>
                    <Image
                        style={styles.imageHeader}
                        source={require('../../assets/images/pin-image.png')}
                    />
                    <Text style={styles.title}>Confirm Old PIN</Text>
                    <Text style={styles.subTitle}>
                        Verify 6-digit security PIN
                    </Text>
                </View>
            </View>
        );
    };

    const renderPin = () => {
        return (
            <View style={styles.inputPin}>
                {pinInputs.map((value, index) => (
                    <TextInput
                        key={index}
                        ref={inputRefs[index]}
                        style={[
                            styles.textInputStyle,
                            {
                                borderColor:
                                    isFocused === index
                                        ? Color.primary
                                        : Color.gray,
                            },
                        ]}
                        secureTextEntry={true}
                        maxLength={1}
                        keyboardType={'numeric'}
                        onChangeText={(text) => handleTextChange(text, index)}
                        onFocus={() => handleFocus(index)}
                        onBlur={handleBlur}
                        autoFocus={isFocused === index}
                    />
                ))}
            </View>
        );
    };

    useEffect(() => {
        checkPin();
    }, [pinInputs[5]]);

    return (
        <SafeAreaView style={styles.controller}>
            <View>
                {renderHeader()}
                {renderPin()}
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

export default ChangePin;
