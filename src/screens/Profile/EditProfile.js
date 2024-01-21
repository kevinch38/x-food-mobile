import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { theme } from '../../theme';
import { useDispatch, useSelector } from 'react-redux';
import { ServiceContext } from '../../context/ServiceContext';
import { useFormik } from 'formik';
import { userAction } from '../../slices/userSlice';
import { useRoute } from '@react-navigation/native';
import Button from '../../components/button';
import InputText from '../../components/inputText';
import ErrorText from '../../components/errorText';
import BackButton from '../../components/backButton';
import * as yup from 'yup';
import bgProfile from '../../assets/images/bg-profile.png';
import Color from '../../assets/Color';
import Loading from '../../components/loading';

function EditProfile({ navigation }) {
    const dispatch = useDispatch();
    const { userService } = useContext(ServiceContext);
    const { users } = useSelector((state) => state.user);
    const route = useRoute();
    const phoneNumbers = route.params?.users.phoneNumber;
    const [image, setImage] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const imageUrl = `https://ui-avatars.com/api/?name=${users?.firstName}+${users?.lastName}`;

    const schema = yup.object().shape({
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
            accountEmail: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
        },
        onSubmit: (values) => {
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
        try {
            setIsLoading(true);
            if (phoneNumbers) {
                dispatch(
                    userAction(async () => {
                        const result =
                            await userService.fetchUserByPhoneNumber(
                                phoneNumbers,
                            );

                        if (result.data.profilePhoto) {
                            setImage(
                                `data:image/jpeg;base64,${result.data.profilePhoto}`,
                            );
                        } else {
                            setImage(imageUrl);
                        }

                        const updateData = {
                            ...result.data,
                        };

                        const values = {
                            accountID: updateData.accountID,
                            ktpID: updateData.ktpID,
                            accountEmail: updateData.accountEmail,
                            firstName: updateData.firstName,
                            lastName: updateData.lastName,
                            dateOfBirth: updateData.dateOfBirth,
                            phoneNumber: updateData.phoneNumber,
                        };
                        await setValues(values);
                        return result;
                    }),
                );
            }
        } catch (e) {
            console.error('Error fetching user data: ', e);
        } finally {
            setIsLoading(false);
        }
    }, [dispatch, userService, setValues]);

    const renderHeader = () => {
        return (
            <View>
                <BackButton onPress={() => navigation.goBack()} />
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
                        {image ? (
                            <Image
                                source={{
                                    uri: image,
                                }}
                                style={styles.photo}
                            />
                        ) : (
                            <Text
                                style={{
                                    textAlign: 'center',
                                    color: '#9ca3af',
                                }}
                            >
                                Loading ...
                            </Text>
                        )}
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
                            value={phoneNumber}
                            editable={false}
                        />
                    </View>

                    <View>
                        <Text style={styles.textSecondary}>Pin</Text>
                        <Text
                            onPress={() => navigation.navigate('ChangePin')}
                            style={styles.changePin}
                        >
                            Create/Change PIN
                        </Text>
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
                            opacity: isValid && dirty ? 1 : 0.3,
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
            {isLoading ? (
                <Loading />
            ) : (
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    {renderHeader()}
                    {renderEditProfile()}
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
    wrapperName: {
        alignItems: 'center',
        marginTop: 55,
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
        height: 118,
        width: 118,
        borderRadius: 118,
        backgroundColor: '#fff',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
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
        height: 100,
        width: 100,
        borderRadius: 100,
        margin: 9,
    },
    name: {
        fontWeight: '900',
        fontSize: 20,
        marginTop: 13,
    },
    textSecondary: {
        marginTop: 17,
        color: theme.grey,
        fontWeight: '400',
        fontSize: 16,
    },
    customButton: {
        backgroundColor: Color.primary,
    },
    customTitle: {
        fontWeight: 900,
        fontSize: 15,
    },
    changePin: {
        marginTop: 10,
        fontWeight: '900',
        fontSize: 15,
        color: theme.secondary,
        paddingVertical: 8,
        width: '40%',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        elevation: 5,
    },
    titleModal: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 15,
    },
    choiceBtnProfile: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnOption: {
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
        marginHorizontal: 8,
        backgroundColor: '#f3f4f6',
    },
    textBtn: {
        marginTop: 4,
        fontSize: 12,
    },
    modalOption: {
        fontSize: 18,
        marginBottom: 15,
    },
});
export default EditProfile;
