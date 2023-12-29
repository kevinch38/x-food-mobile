import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import bgProfile from '../../assets/images/bg-profile.png';
import photo from '../../assets/images/profile.png';
import camera from '../../assets/icons/camera.png';
import Color from '../../assets/Color';
import Button from '../../components/button';
import { theme } from '../../theme';
import { useDispatch } from 'react-redux';
import { useContext, useEffect } from 'react';
import { ServiceContext } from '../../context/ServiceContext';
import { useFormik } from 'formik';
import { userAction } from '../../slices/userSlice';
import * as yup from 'yup';
import InputText from '../../components/inputText';
import ErrorText from '../../components/errorText';
import BackButton from '../../components/backButton';

function EditProfile({ navigation }) {
    const dispatch = useDispatch();
    const { userService } = useContext(ServiceContext);

    const Schema = yup.object().shape({
        firstName: yup
            .string()
            .matches('^[a-zA-Z\\s]*$', 'Invalid Firstname')
            .required('Firstname is Required!'),
        lastName: yup.string().matches('^[a-zA-Z\\s]*$', 'Invalid Lastname'),
        accountEmail: yup
            .string()
            .email('Email not valid')
            .required('Email is Required!'),
    });

    const {
        values: { firstName, lastName, accountEmail, phoneNumber },
        errors,
        touched,
        dirty,
        isValid,
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
        validationSchema: Schema,
    });

    const handleBack = () => {
        navigation.goBack();
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
                    <Image source={bgProfile} style={styles.bgProfile} />
                </View>
            </View>
        );
    };

    const renderEditProfile = () => {
        return (
            <View>
                <View style={styles.wrapperProfile}>
                    <View style={styles.outerCircle}>
                        <Image source={photo} style={styles.photo} />
                        <View style={styles.wrapperCamera}>
                            <Image source={camera} style={styles.iconCamera} />
                        </View>
                    </View>
                </View>

                <View style={styles.wrapperInput}>
                    <View>
                        <InputText
                            label={'First Name'}
                            labelRequired={'*'}
                            placeholder={'Eljad'}
                            onChangeText={handleChange('firstName')}
                            value={firstName}
                        />
                        {touched.firstName && errors.firstName && (
                            <ErrorText message={errors.firstName} />
                        )}
                    </View>
                    <View>
                        <InputText
                            label={'Last Name'}
                            placeholder={'Eendaz'}
                            onChangeText={handleChange('lastName')}
                            value={lastName}
                        />
                        {touched.lastName && errors.lastName && (
                            <ErrorText message={errors.lastName} />
                        )}
                    </View>
                    <View>
                        <InputText
                            label={'Email'}
                            labelRequired={'*'}
                            placeholder={'prelookstudio@gmail.com'}
                            onChangeText={handleChange('accountEmail')}
                            value={accountEmail}
                            keyboardType={'email-address'}
                        />
                        {touched.accountEmail && errors.accountEmail && (
                            <ErrorText message={errors.accountEmail} />
                        )}
                    </View>
                    <View>
                        <InputText
                            label={'Phone Number'}
                            labelRequired={'*'}
                            placeholder={'81201234321'}
                            keyboardType={'phone-pad'}
                            onChangeText={handleChange('phoneNumber')}
                            value={phoneNumber}
                            editable={false}
                        />
                        {touched.phoneNumber && errors.phoneNumber && (
                            <ErrorText message={errors.phoneNumber} />
                        )}
                    </View>
                </View>
            </View>
        );
    };

    const renderButtonSave = () => {
        return (
            <View style={styles.buttonContainer}>
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
                {renderEditProfile()}
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
    wrapperName: {
        alignItems: 'center',
        marginTop: 55,
    },
    wrapperCamera: {
        position: 'absolute',
        backgroundColor: 'white',
        width: 27,
        height: 27,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        right: 10,
        bottom: 2,
    },
    buttonContainer: {
        alignItems: 'center',
        marginBottom: 60,
        marginTop: 50,
    },
    wrapperProfile: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 154,
        marginBottom: 24,
    },
    wrapperInput: {
        marginTop: 78,
        paddingHorizontal: 18,
    },
    outerCircle: {
        position: 'absolute',
        height: 108,
        width: 108,
        borderRadius: 108 / 2,
        backgroundColor: 'white',
    },
    bgProfile: {
        marginTop: -23,
        resizeMode: 'contain',
        width: 378,
        height: 285,
        position: 'absolute',
    },
    photo: {
        position: 'absolute',
        height: 90,
        width: 90,
        borderRadius: 90 / 2,
        margin: 9,
    },
    iconCamera: {
        width: 11,
        height: 9.9,
    },
    name: {
        fontWeight: '900',
        fontSize: 20,
        marginTop: 13,
    },
    textSecondary: {
        marginTop: 29,
        color: theme.grey,
        fontWeight: '400',
        fontSize: 16,
    },
    customButton: {
        backgroundColor: Color.secondary,
    },
    customTitle: {
        fontWeight: 900,
        fontSize: 15,
    },
});
export default EditProfile;
