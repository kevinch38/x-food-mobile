import {Alert, Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View} from "react-native";
import BackButton from "../../components/backButton";
import Color from "../../assets/Color";
import React, {useEffect, useRef, useState} from "react";
import {theme} from "../../theme";
import {useSelector} from "react-redux";
import PinService from "../../services/PinService";


const SetupNewPin = ({navigation}) => {

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

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


    const handleInput = () => {
        try {
            const inputText = input1 + input2 + input3 + input4 +input5 + input6;
            if (inputText.length === 6) {
                navigation.navigate("UpdateNewPin", {dataInput : inputText});
            }
        }catch (error) {
            console.error("Error during pinCheck:", error);
        }
    }

    useEffect(() => {
        handleInput();
    }, [input6]);

    const renderHeader = () => {
        return (
            <View>
                <BackButton onPress={() => navigation.goBack()} />

                <View style={styles.imageController}>
                    <Image
                        style={styles.imageHeader}
                        source={require('../../assets/images/pin-image.png')}
                    />
                    <Text style={styles.title}>Setup New Pin</Text>
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
                <TextInput
                    ref={input1Ref}
                    style={[
                        styles.textInputStyle,
                        { borderColor: isFocused ? Color.primary : Color.gray },
                    ]}
                    secureTextEntry={true}
                    maxLength={1}
                    autoFocus={true}
                    keyboardType={'numeric'}
                    onChangeText={(text) =>
                        handleTextChange(text, input2Ref, null, setInput1)
                    }
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                <TextInput
                    ref={input2Ref}
                    style={[
                        styles.textInputStyle,
                        { borderColor: isFocused ? Color.primary : Color.gray },
                    ]}
                    secureTextEntry={true}
                    maxLength={1}
                    keyboardType={'numeric'}
                    onChangeText={(text) =>
                        handleTextChange(text, input3Ref, input1Ref, setInput2)
                    }
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                <TextInput
                    ref={input3Ref}
                    style={[
                        styles.textInputStyle,
                        { borderColor: isFocused ? Color.primary : Color.gray },
                    ]}
                    secureTextEntry={true}
                    maxLength={1}
                    keyboardType={'numeric'}
                    onChangeText={(text) =>
                        handleTextChange(text, input4Ref, input2Ref, setInput3)
                    }
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                <TextInput
                    ref={input4Ref}
                    style={[
                        styles.textInputStyle,
                        { borderColor: isFocused ? Color.primary : Color.gray },
                    ]}
                    secureTextEntry={true}
                    maxLength={1}
                    keyboardType={'numeric'}
                    onChangeText={(text) =>
                        handleTextChange(text, input5Ref, input3Ref, setInput4)
                    }
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                <TextInput
                    ref={input5Ref}
                    style={[
                        styles.textInputStyle,
                        { borderColor: isFocused ? Color.primary : Color.gray },
                    ]}
                    secureTextEntry={true}
                    maxLength={1}
                    keyboardType={'numeric'}
                    onChangeText={(text) =>
                        handleTextChange(text, input6Ref, input4Ref, setInput5)
                    }
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                <TextInput
                    ref={input6Ref}
                    style={[
                        styles.textInputStyle,
                        { borderColor: isFocused ? Color.primary : Color.gray },
                    ]}
                    secureTextEntry={true}
                    maxLength={1}
                    keyboardType={'numeric'}
                    onChangeText={(text) =>
                        handleTextChange(text, null, input5Ref, setInput6)
                    }
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </View>
        );

}

    return (
        <SafeAreaView style={styles.controller}>
            <View>
                {renderHeader()}
                {renderPin()}
            </View>
        </SafeAreaView>
    );



};
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


export default SetupNewPin;