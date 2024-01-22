import {
    ActivityIndicator,
    Alert,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Color from '../../assets/Color';
import Button from '../../components/button';
import { theme } from '../../theme';
import { useDispatch, useSelector } from 'react-redux';
import { ServiceContext } from '../../context/ServiceContext';
import { checkKtpAction, userAction } from '../../slices/userSlice';
import { useFormik } from 'formik';
import * as yup from 'yup';
import InputText from '../../components/inputText';
import ErrorText from '../../components/errorText';
import BackButton from '../../components/backButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute } from '@react-navigation/native';

function CompleteProfile({ navigation }) {
    const dispatch = useDispatch();
    const { userService } = useContext(ServiceContext);
    const { users } = useSelector((state) => state.user);
    const route = useRoute();
    const phoneNumbers = route.params?.users.phoneNumber;
    const [nikInput, setNikInput] = useState('');
    const [isNikVerified, setIsNikVerified] = useState(false);
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
    const [isVisibleButton, setIsVisibleButton] = useState(false);
    const { isLoading } = useSelector((state) => state.ui);

    const [dob, setDOB] = useState('');
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const schema = yup.object().shape({
        ktpID: yup
            .string()
            .matches(/^\d{16}$/, 'NIK must be exactly 16 digits')
            .required('NIK is Required!'),
    });

    const {
        values: { ktpID, dateOfBirth },
        errors,
        touched,
        isValid,
        dirty,
        handleChange,
        handleSubmit,
        setValues,
    } = useFormik({
        initialValues: {
            accountID: null,
            ktpID: '',
            dateOfBirth: '',
        },
        onSubmit: async (values) => {
            if (!isValid) return;

            dispatch(
                userAction(async () => {
                    try {
                        const result = await userService.updateUser(values);
                        if (result.statusCode === 200) {
                            Alert.alert(
                                'Success',
                                'Data updated successfully',
                                [
                                    {
                                        text: 'Ok',
                                        onPress: async () => {
                                            navigation.goBack();
                                        },
                                    },
                                ],
                                { cancelable: false },
                            );
                        } else {
                            Alert.alert('Error', 'Failed to update data');
                        }
                        const update = { data: { ...users, temp: 'a' } };
                        return update;
                    } catch (e) {
                        console.error('Error update user data: ', e);
                        Alert.alert('Error', 'Failed to update data');
                    }
                }),
            );
        },
        validationSchema: schema,
    });

    useEffect(() => {
        if (phoneNumbers) {
            dispatch(
                userAction(async () => {
                    const result =
                        await userService.fetchUserByPhoneNumber(phoneNumbers);

                    const updateData = {
                        ...result.data,
                    };

                    const values = {
                        accountID: updateData.accountID,
                        ktpID: updateData.ktpID,
                        accountEmail: updateData.accountEmail,
                        phoneNumber: updateData.phoneNumber,
                        firstName: updateData.firstName,
                        lastName: updateData.lastName,
                        dateOfBirth: updateData.dateOfBirth,
                    };
                    await setValues(values);
                    return result;
                }),
            );
        }
    }, [dispatch, userService, setValues]);

    const handleVerifyKtp = async (idKtp) => {
        try {
            dispatch(
                checkKtpAction(async () => {
                    const result = await userService.ktpCheck(idKtp);

                    if (result.data === null) {
                        Alert.alert('Success', 'NIK Verified', [
                            {
                                text: 'OK',
                                onPress: () => {
                                    setIsNikVerified(false);
                                    setIsVisibleButton(true);
                                    setIsSaveButtonDisabled(false);
                                },
                            },
                        ]);
                    } else {
                        Alert.alert('Warning', 'NIK is already registered');
                        setIsNikVerified(true);
                    }
                }),
            );
        } catch (error) {
            console.log('error', error);
        }
    };

    const isVerify = ktpID.length !== 16;

    const toggleDatepicker = () => {
        setShowPicker(!showPicker);
    };

    const currentDate = new Date();
    const maximumDate = new Date(
        currentDate.getFullYear() - 13,
        currentDate.getMonth(),
        currentDate.getDate(),
    );

    const formatDate = (rawDate) => {
        let date = new Date(rawDate);

        date.setUTCHours(date.getUTCHours() + 7);

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;

        return `${year}-${month}-${day}`;
    };

    const onChange = ({ type }, selectDate) => {
        if (type === 'set') {
            const currentDate = selectDate;
            setDate(currentDate);

            if (Platform.OS === 'android') {
                toggleDatepicker();
                setDOB(formatDate(currentDate));
                handleChange('dateOfBirth')(formatDate(currentDate));
            }
        } else {
            toggleDatepicker();
        }
    };

    const renderHeader = () => {
        return (
            <View>
                <BackButton onPress={() => navigation.goBack()} />
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.title}>Profile Info</Text>
                </View>
            </View>
        );
    };

    const renderInput = () => {
        return (
            <View style={styles.wrapperInput}>
                <View>
                    {!isVisibleButton ? (
                        <InputText
                            label={'NIK'}
                            labelRequired={'*'}
                            placeholder={'3347891801970001'}
                            keyboardType={'numeric'}
                            onChangeText={(value) => {
                                setNikInput(value);
                                handleChange('ktpID')(value);
                                setIsNikVerified(false);
                            }}
                            maxLength={16}
                            value={ktpID}
                        />
                    ) : (
                        <InputText
                            label={'NIK'}
                            labelRequired={'*'}
                            placeholder={'3347891801970001'}
                            keyboardType={'numeric'}
                            onChangeText={(value) => {
                                setNikInput(value);
                                handleChange('ktpID')(value);
                                setIsNikVerified(false);
                            }}
                            maxLength={16}
                            value={ktpID}
                            editable={false}
                            textInputStyleCustom={{ color: 'black' }}
                        />
                    )}
                    {touched.ktpID && errors.ktpID && (
                        <ErrorText message={errors.ktpID} />
                    )}
                </View>

                <View style={styles.verifyContainer}>
                    {!isVisibleButton ? (
                        <Button
                            title={'Verify'}
                            buttonStyle={[
                                styles.customButtonVerify,
                                nikInput.length !== 16 && { opacity: 0.5 },
                            ]}
                            titleStyle={styles.customTitle}
                            onPress={() => handleVerifyKtp(ktpID)}
                            disabled={isVerify}
                        />
                    ) : (
                        <Button
                            title={'Verify'}
                            buttonStyle={[
                                styles.customButtonVerify,
                                { opacity: 0.5 },
                            ]}
                            titleStyle={styles.customTitle}
                            disabled={true}
                        />
                    )}
                </View>

                <View>
                    {showPicker && (
                        <DateTimePicker
                            value={date}
                            mode={'date'}
                            display={'calendar'}
                            onChange={onChange}
                            maximumDate={maximumDate}
                            minimumDate={new Date(1950, 0, 1)}
                        />
                    )}

                    {!showPicker ? (
                        <Pressable onPress={toggleDatepicker}>
                            <InputText
                                label={'Date of Birth'}
                                labelRequired={'*'}
                                placeholder={'1990-02-24'}
                                keyboardType={'numeric'}
                                onChangeText={(value) => {
                                    setDOB(value);
                                    handleChange('dateOfBirth')(value);
                                }}
                                value={dob}
                                editable={false}
                                textInputStyleCustom={{ color: 'black' }}
                            />
                        </Pressable>
                    ) : (
                        <Pressable onPress={toggleDatepicker}>
                            <InputText
                                label={'Date of Birth'}
                                labelRequired={'*'}
                                placeholder={'1990-02-24'}
                                keyboardType={'numeric'}
                                onChangeText={(value) => {
                                    setDOB(value);
                                    handleChange('dateOfBirth')(value);
                                }}
                                value={dob}
                                editable={false}
                                textInputStyleCustom={{ color: 'black' }}
                            />
                        </Pressable>
                    )}
                </View>
            </View>
        );
    };

    const renderButtonSave = () => {
        return (
            <View style={styles.wrapperButton}>
                <Button
                    title={'Save'}
                    buttonStyle={[
                        styles.customButton,
                        {
                            opacity: !isSaveButtonDisabled ? 1 : 0,
                        },
                    ]}
                    titleStyle={styles.customTitle}
                    onPress={() => handleSubmit()}
                    disabled={!isValid || !dirty || isSaveButtonDisabled}
                />
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                <View style={styles.loading}>
                    <ActivityIndicator color={Color.primary} size={'large'} />
                </View>
            ) : (
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    {renderHeader()}
                    {renderInput()}
                    {renderButtonSave()}
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loading: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    title: {
        marginTop: 45,
        fontWeight: '500',
        fontSize: 18,
    },
    dateTime: {
        width: 340,
        height: 60,
    },
    wrapperButton: {
        alignItems: 'center',
        marginBottom: 50,
        marginTop: 60,
    },
    wrapperInput: {
        paddingHorizontal: 18,
        marginTop: 40,
    },
    wrapperDate: {
        height: 65,
        borderWidth: 1,
        marginTop: 9,
        borderRadius: 10,
        paddingHorizontal: 6,
        fontSize: 17,
        justifyContent: 'center',
        alignItems: 'start',
        borderColor: theme.grey,
    },
    textSecondary: {
        marginTop: 17,
        color: theme.grey,
        fontWeight: '400',
        fontSize: 16,
    },
    customButton: {
        backgroundColor: Color.primary,
        fontWeight: '900',
        fontSize: 15,
    },
    customButtonVerify: {
        backgroundColor: Color.primary,
        width: 99,
        height: 34,
        fontWeight: '900',
        fontSize: 15,
    },
    customTitle: {
        fontWeight: 900,
        fontSize: 15,
    },
    verifyContainer: {
        alignItems: 'flex-end',
        marginTop: 8,
    },
    titleVerify: {
        backgroundColor: Color.primary,
        color: '#fff',
        borderRadius: 24,
        paddingVertical: 8,
        paddingHorizontal: 24,
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
});
export default CompleteProfile;
