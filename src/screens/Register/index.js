import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    BackHandler,
    Animated,
    Alert,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Color from '../../assets/Color';
import { CheckBox, Icon } from '@rneui/themed';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { userAction, userRegisterAction } from '../../slices/userSlice';
import { ServiceContext } from '../../context/ServiceContext';
import { theme } from '../../theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export default function Register({ navigation }) {
    const [focusedInput, setFocusedInput] = useState(null);
    const dispatch = useDispatch();
    const { userService } = useContext(ServiceContext);
    const { users } = useSelector((state) => state.user);
    const { phoneNumber } = useSelector((state) => state.ui);
    const [bottomAnim] = useState(new Animated.Value(-100));
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (visible) {
            Animated.timing(bottomAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start();

            setTimeout(() => {
                setVisible(false);
                bottomAnim.setValue(-100);
            }, 3000);
        }
    }, [visible, bottomAnim]);

    useEffect(() => {
        if (phoneNumber) {
            dispatch(
                userAction(async () => {
                    const response =
                        await userService.fetchUserByPhoneNumber(phoneNumber);
                    const updateData = {
                        ...response.data,
                    };

                    const values = {
                        accountID: updateData.accountID,
                        ktpID: updateData.ktpID,
                        phoneNumber: updateData.phoneNumber,
                        firstName: updateData.firstName,
                        lastName: updateData.lastName,
                        dateOfBirth: updateData.dateOfBirth,
                    };
                    setValues(values);
                    return null;
                }),
            );
        }
    }, [dispatch, userService, setValues]);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => true,
        );
        return () => backHandler.remove();
    }, []);

    const Schema = yup.object().shape({
        firstName: yup
            .string()
            .matches(/^[a-zA-Z0-9. ]*$/, 'Invalid Firstname')
            .required('First Name Required'),
        lastName: yup.string().matches(/^[a-zA-Z0-9. ]*$/, 'Invalid Lastname'),
        accountEmail: yup
            .string()
            .email('Email not valid')
            .required('Email required'),
        aggrement: yup
            .boolean()
            .oneOf([true], 'Anda harus menyutujui persyaratan'),
    });

    const {
        values,
        errors,
        touched,
        dirty,
        isValid,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        setValues,
    } = useFormik({
        initialValues: {
            accountID: null,
            ktpID: '',
            accountEmail: '',
            phoneNumber: '',
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            aggrement: false,
        },
        onSubmit: async (formValues) => {
            try {
                if (!formValues) return;

                const { aggrement, ...values } = formValues;

                dispatch(
                    userRegisterAction(async () => {
                        try {
                            const result = await userService.updateUser(values);
                            if (result.statusCode === 200) {
                                setVisible(true);
                                setTimeout(() => {
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'Tabs' }],
                                    });
                                }, 3000);
                            } else if (result.statusCode === 409) {
                                alert(`We're sorry, that email is taken`);
                            }
                        } catch (error) {
                            error.response.data.statusCode === 409
                                ? Alert.alert(
                                      'Message',
                                      "We're sorry, that email is taken",
                                      [
                                          {
                                              text: 'Ok',
                                          },
                                      ],
                                      { cancelable: false },
                                  )
                                : alert(error.response.data.message);
                        }
                    }),
                );
            } catch (error) {
                alert('Trouble in trasfering data');
            }
        },
        validationSchema: Schema,
    });

    const isDisabled =
        !isValid || !dirty || values.aggrement !== true
            ? Color.disabled
            : Color.primary;

    const handleInputFocus = (input) => {
        setFocusedInput(input);
    };

    const renderPopup = () => {
        return (
            <View>
                {visible && (
                    <Animated.View
                        style={[
                            styles.popupContainer,
                            {
                                bottom: bottomAnim,
                            },
                        ]}
                    >
                        <Text style={styles.popupText}>
                            Account Successfully Created
                        </Text>
                    </Animated.View>
                )}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.wrapper}>
            <StatusBar barStyle={'dark-content'} />
            <KeyboardAwareScrollView>
                <View>
                    <Image
                        style={styles.wall2}
                        source={require('../../assets/images/rightTop.png')}
                    />
                </View>
                <View>
                    <Image
                        style={styles.wall1}
                        source={require('../../assets/images/leftTop2.png')}
                    />
                    <Image
                        source={require('../../assets/images/leftTop1.png')}
                    />
                </View>

                <View>
                    <Text style={styles.titleStyle}>Get Started</Text>
                </View>
                <View style={styles.container}>
                    <View>
                        <View>
                            <View style={styles.wrapperTitle}>
                                <Text style={styles.labelStyle}>
                                    First Name{' '}
                                </Text>
                                <Text style={styles.labelRequired}>*</Text>
                            </View>
                            <TextInput
                                style={[
                                    styles.input,
                                    {
                                        borderColor:
                                            focusedInput === 'firstName'
                                                ? Color.primary
                                                : '#000000',
                                        borderWidth:
                                            focusedInput === 'firstName'
                                                ? 1
                                                : 0.3,
                                    },
                                ]}
                                onFocus={() => handleInputFocus('firstName')}
                                placeholder="John"
                                onChangeText={handleChange('firstName')}
                                onBlur={handleBlur('firstName')}
                                value={values.firstName}
                                maxLength={30}
                            />
                            {touched.firstName && errors.firstName && (
                                <Text style={styles.errorText}>
                                    {errors.firstName}
                                </Text>
                            )}
                        </View>
                        <View>
                            <Text style={styles.labelStyle}>Last Name</Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    {
                                        borderColor:
                                            focusedInput === 'lastName'
                                                ? Color.primary
                                                : '#000000',
                                        borderWidth:
                                            focusedInput === 'lastName'
                                                ? 1
                                                : 0.3,
                                    },
                                ]}
                                onFocus={() => handleInputFocus('lastName')}
                                placeholder="Doe"
                                onChangeText={handleChange('lastName')}
                                onBlur={handleBlur('lastName')}
                                value={values.lastName}
                                maxLength={30}
                            />
                            {touched.lastName && errors.lastName && (
                                <Text style={styles.errorText}>
                                    {errors.lastName}
                                </Text>
                            )}
                        </View>
                        <View>
                            <View style={styles.wrapperTitle}>
                                <Text style={styles.labelStyle}>Email</Text>
                                <Text style={styles.labelRequired}>*</Text>
                            </View>
                            <TextInput
                                style={[
                                    styles.input,
                                    {
                                        borderColor:
                                            focusedInput === 'accountEmail'
                                                ? Color.primary
                                                : '#000000',
                                        borderWidth:
                                            focusedInput === 'accountEmail'
                                                ? 1
                                                : 0.3,
                                    },
                                ]}
                                onFocus={() => handleInputFocus('accountEmail')}
                                placeholder="johndoe@address.com"
                                onChangeText={handleChange('accountEmail')}
                                onBlur={handleBlur('accountEmail')}
                                value={values.accountEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            {touched.accountEmail && errors.accountEmail && (
                                <Text style={styles.errorText}>
                                    {errors.accountEmail}
                                </Text>
                            )}
                        </View>
                        <View style={styles.checkBox}>
                            <CheckBox
                                textStyle={{
                                    color: values.aggrement
                                        ? theme.dark
                                        : theme.grey,
                                }}
                                title={
                                    'I agree to our Terms and Conditions and Privacy Policy'
                                }
                                checked={values.aggrement}
                                onPress={() =>
                                    setFieldValue(
                                        'aggrement',
                                        !values.aggrement,
                                    )
                                }
                                checkedColor="grey"
                            />
                            {touched.aggrement && errors.aggrement && (
                                <Text style={styles.errorTextAgg}>
                                    {errors.aggrement}
                                </Text>
                            )}
                        </View>
                        {renderPopup()}
                        <View style={styles.wrapperButton}>
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    { backgroundColor: isDisabled },
                                ]}
                                onPress={handleSubmit}
                                disabled={
                                    !isValid ||
                                    !dirty ||
                                    values.aggrement !== true
                                }
                            >
                                <Text style={styles.textStyle}>LOGIN</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        height: '100%',
        backgroundColor: '#fff',
    },
    Submit: {
        backgroundColor: Color.primary,
    },
    wall1: {
        flex: 1,
        position: 'absolute',
    },
    wall2: {
        flex: 1,
        position: 'absolute',
        right: 0,
    },
    container: {
        height: '100%',
        alignItems: 'center',
    },
    wrapperButton: {
        width: 350,
        height: 'min-content',
        marginBottom: 36,
    },
    button: {
        borderRadius: 1000 / 2,
        justifyContent: 'center',
        height: '30%',
        width: '100%',
    },
    buttonBack: {
        left: 20,
        top: '-3%',
        width: '10%',
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
    },
    backIcon: {
        width: 'auto',
    },
    wrapperTitle: {
        flexDirection: 'row',
        marginTop: '2%',
    },
    labelStyle: {
        textAlign: 'left',
        fontWeight: '400',
        color: theme.dark,
        fontSize: 16,
    },
    labelRequired: {
        color: theme.secondary,
        fontSize: 15,
    },
    titleStyle: {
        textAlign: 'left',
        left: '5%',
        bottom: 0,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 40,
        marginTop: '20%',
    },
    checkBox: {
        width: '80%',
        margin: 0,
        color: '#C4C4C4',
    },
    textStyle: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'medium',
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
    errorTextAgg: {
        color: 'red',
        marginVertical: 7,
        textAlign: 'center',
    },
    input: {
        color: theme.dark,
        height: 65,
        width: 350,
        borderWidth: 1,
        fontSize: 17,
        padding: 15,
        marginBottom: 7,
        marginTop: 5,
        borderRadius: 10,
        borderColor: '#C4C4C4',
    },
    popupContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -100,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 70,
        borderRadius: 8,
    },
    popupText: {
        color: 'white',
    },
});
