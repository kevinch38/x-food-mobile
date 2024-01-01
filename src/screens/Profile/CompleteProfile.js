import {
    Alert,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Color from '../../assets/Color';
import Button from '../../components/button';
import { theme } from '../../theme';
import { useDispatch, useSelector } from 'react-redux';
import { ServiceContext } from '../../context/ServiceContext';
import { userAction } from '../../slices/userSlice';
import { useFormik } from 'formik';
import * as yup from 'yup';
import InputText from '../../components/inputText';
import ErrorText from '../../components/errorText';
import BackButton from '../../components/backButton';

function CompleteProfile({ navigation }) {
    const dispatch = useDispatch();
    const { userService } = useContext(ServiceContext);
    const { users } = useSelector((state) => state.user);
    const [isKtpVerified, setIsKtpVerified] = useState(false);
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);

    const schema = yup.object().shape({
        ktpID: yup
            .string()
            .matches(/^\d{16}$/, 'NIK must be exactly 16 digits')
            .required('NIK is Required!'),
        dateOfBirth: yup
            .string()
            .matches(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')
            .required('Date of Birth is Required!')
            .test('valid-dob', 'Invalid Date of Birth', function (value) {
                if (value) {
                    const currentDate = new Date();
                    const selectedDate = new Date(value);

                    const isValidMonth =
                        selectedDate.getMonth() + 1 >= 1 &&
                        selectedDate.getMonth() + 1 <= 12;
                    const isValidDay =
                        selectedDate.getDate() >= 1 &&
                        selectedDate.getDate() <= 31;

                    return (
                        isValidMonth &&
                        isValidDay &&
                        selectedDate <= currentDate
                    );
                }
                return true;
            }),
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
            accountEmail: '',
            phoneNumber: '',
            firstName: '',
            lastName: '',
            dateOfBirth: '',
        },
        onSubmit: async (values) => {
            if (!isValid) return;

            dispatch(
                userAction(async () => {
                    const result = await userService.updateUser(values);
                    if (result.statusCode === 200) {
                        Alert.alert(
                            'Success',
                            'Data updated successfully',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => {
                                        navigation.goBack();
                                    },
                                },
                            ],
                            { cancelable: false },
                        );
                    }
                    return null;
                }),
            );
        },
        validationSchema: schema,
    });

    useEffect(() => {
        if (users.phoneNumber) {
            dispatch(
                userAction(async () => {
                    const result = await userService.fetchUserByPhoneNumber(
                        users.phoneNumber,
                    );
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
                    setValues(values);
                    return null;
                }),
            );
        }
    }, [dispatch, userService, setValues]);

    const handleVerifyKtp = async () => {
        const registeredKtpIDs = [
            '1234567890123456',
            '9876543210987654',
            '1111222233334444',
        ];

        const exists = registeredKtpIDs.includes(ktpID);

        if (exists) {
            Alert.alert('Peringatan', 'NIK sudah terdaftar di database');
            setIsKtpVerified(true);
            setIsSaveButtonDisabled(true);
        } else {
            Alert.alert('Sukses', 'NIK tersedia');
            setIsKtpVerified(false);
            setIsSaveButtonDisabled(false);
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
                    <InputText
                        label={'NIK'}
                        labelRequired={'*'}
                        placeholder={'3347891801970001'}
                        keyboardType={'numeric'}
                        onChangeText={handleChange('ktpID')}
                        maxLength={16}
                        value={ktpID}
                    />
                    {touched.ktpID && errors.ktpID && (
                        <ErrorText message={errors.ktpID} />
                    )}
                </View>

                <View style={styles.verifyContainer}>
                    <TouchableOpacity
                        onPress={handleVerifyKtp}
                        style={styles.buttonVerify}
                    >
                        <Text style={styles.titleVerify}>Verify</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <InputText
                        label={'Date of Birth'}
                        labelRequired={'*'}
                        placeholder={'1990-02-24'}
                        keyboardType={'numeric'}
                        onChangeText={handleChange('dateOfBirth')}
                        value={dateOfBirth}
                    />
                    {touched.dateOfBirth && errors.dateOfBirth && (
                        <ErrorText message={errors.dateOfBirth} />
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
                            opacity:
                                isValid && dirty && !isKtpVerified ? 1 : 0.5,
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
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                {renderHeader()}
                {renderInput()}
                {renderButtonSave()}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#fff',
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
