import {
    Alert,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, { useContext, useEffect } from 'react';
import Color from '../../assets/Color';
import Button from '../../components/button';
import { theme } from '../../theme';
import { useDispatch } from 'react-redux';
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

    const Schema = yup.object().shape({
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
            pinID: '',
            createdAt: new Date(),
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            updatedAt: new Date(),
            balanceID: '',
            loyaltyPointID: '',
            otpID: '',
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
                                        navigation.navigate('Profile');
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
        validationSchema: Schema,
    });

    const handleBack = () => {
        navigation.navigate('Profile');
    };

    const handleChangePin = () => {
        console.log('Create/Change PIN');
    };

    useEffect(() => {
        if ('1') {
            dispatch(
                userAction(async () => {
                    const result =
                        await userService.fetchUserByPhoneNumber('1');
                    const updateData = {
                        ...result.data,
                    };

                    const values = {
                        accountID: updateData.accountID,
                        ktpID: updateData.ktpID,
                        accountEmail: updateData.accountEmail,
                        phoneNumber: updateData.phoneNumber,
                        pinID: updateData.pinID,
                        createdAt: updateData.createdAt,
                        firstName: updateData.firstName,
                        lastName: updateData.lastName,
                        dateOfBirth: updateData.dateOfBirth,
                        updatedAt: new Date(),
                        balanceID: updateData.balanceID,
                        loyaltyPointID: updateData.loyaltyPointID,
                        otpID: updateData.otpID,
                    };
                    setValues(values);
                    return null;
                }),
            );
        }
    }, [dispatch, userService, setValues]);

    const renderHeader = () => {
        return (
            <View>
                <BackButton onPress={handleBack} />
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
                        value={ktpID}
                    />
                    {touched.ktpID && errors.ktpID && (
                        <ErrorText message={errors.ktpID} />
                    )}
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
                <View>
                    <Text style={styles.textSecondary}>Pin</Text>
                    <Text onPress={handleChangePin} style={styles.changePin}>
                        Create/Change PIN
                    </Text>
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
                            opacity: isValid && dirty ? 1 : 0.5,
                        },
                    ]}
                    titleStyle={styles.customTitle}
                    onPress={() => handleSubmit()}
                    disabled={!isValid || !dirty}
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
    },
    title: {
        marginTop: 60,
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
        backgroundColor: Color.secondary,
        fontWeight: '900',
        fontSize: 15,
    },
    changePin: {
        marginTop: 9,
        fontWeight: '900',
        fontSize: 15,
        color: theme.secondary,
    },
    customTitle: {
        fontWeight: 900,
        fontSize: 15,
    },
});
export default CompleteProfile;
