import {
    Alert,
    Image,
    Modal,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import bgProfile from '../../assets/images/bg-profile.png';
import camera from '../../assets/icons/camera.png';
import Color from '../../assets/Color';
import Button from '../../components/button';
import { theme } from '../../theme';
import { useDispatch, useSelector } from 'react-redux';
import React, { useContext, useEffect, useState } from 'react';
import { ServiceContext } from '../../context/ServiceContext';
import { useFormik } from 'formik';
import { userAction } from '../../slices/userSlice';
import * as yup from 'yup';
import InputText from '../../components/inputText';
import ErrorText from '../../components/errorText';
import BackButton from '../../components/backButton';
import * as ImagePicker from 'expo-image-picker';
import * as Icon from 'react-native-feather';

function EditProfile({ navigation }) {
    const dispatch = useDispatch();
    const { userService } = useContext(ServiceContext);
    const { users } = useSelector((state) => state.user);
    const [image, setImage] = useState();
    const [modalVisible, setModalVisible] = useState(false);

    const imageUrl =
        'https://pixabay.com/get/g1905cc00441dc61d2c96b34edd2216241e5cdb87dfebe3fa18c7ee099198466cf6c52eed7f0fdd476deefee6b71574ecf0813154b02c103e1a0d4ed36be602b72906916bfc382c102a0b45d5b70a99ce_640.png';

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
            ktpID: '',
            accountEmail: '',
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            phoneNumber: '',
        },
        onSubmit: (values) => {
            if (!isValid) return;
            //
            // const formData = new FormData();
            // formData.append('accountID', values.accountID.toString());
            // formData.append('ktpID', values.ktpID);
            // formData.append('accountEmail', values.accountEmail);
            // formData.append('firstName', values.firstName);
            // formData.append('lastName', values.lastName);
            // formData.append('dateOfBirth', values.dateOfBirth);
            // formData.append('phoneNumber', values.phoneNumber);
            //
            // if (values.profilePhoto) {
            //     const uri = values.profilePhoto;
            //     const type = 'image/jpeg';
            //     const name = 'profile.jpg';
            //     formData.append('profilePhoto', { uri, type, name });
            // }
            //
            // console.log('FormData sebelum dikirim:', formData);

            try {
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
            } catch (e) {
                console.error('Error update user data: ', e);
            }
        },
        validationSchema: schema,
    });

    useEffect(() => {
        const phoneNumber = '+6285201205272';
        if (phoneNumber) {
            dispatch(
                userAction(async () => {
                    const result =
                        await userService.fetchUserByPhoneNumber(phoneNumber);

                    if (users.profilePhoto) {
                        setImage(
                            `data:image/jpeg;base64,${users.profilePhoto}`,
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
                    setValues(values);
                    return null;
                }),
            );
        }
    }, [dispatch, userService, setValues]);

    const openModal = () => {
        setModalVisible(true);
    };
    const closeModal = () => {
        setModalVisible(false);
    };
    const uploadImage = async (mode) => {
        try {
            let result = {};

            if (mode === 'gallery') {
                await ImagePicker.requestMediaLibraryPermissionsAsync();
                result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                });
            } else {
                await ImagePicker.requestCameraPermissionsAsync();
                result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                });
            }

            if (!result.canceled) {
                // save image
                await saveImage(result.assets[0].uri);
            }
        } catch (e) {
            alert('Error uploading image: ' + e.message);
            closeModal();
        }
    };
    const saveImage = async (image) => {
        try {
            setImage(image);
            // setValues((prevState) => ({
            //     ...prevState,
            //     profilePhoto: image,
            // }));
            closeModal();
        } catch (e) {
            throw e;
        }
    };

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
    const renderModal = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.titleModal}>Profile Photo</Text>
                        <View style={styles.choiceBtnProfile}>
                            <TouchableOpacity onPress={uploadImage}>
                                <View style={styles.btnOption}>
                                    <Icon.Camera
                                        width={24}
                                        height={24}
                                        strokeWidth={2}
                                        color={Color.primary}
                                    />
                                    <Text style={styles.textBtn}>Camera</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => uploadImage('gallery')}
                            >
                                <View style={styles.btnOption}>
                                    <Icon.Image
                                        width={24}
                                        height={24}
                                        strokeWidth={2}
                                        color={Color.primary}
                                    />
                                    <Text style={styles.textBtn}>Gallery</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={closeModal}>
                                <View style={styles.btnOption}>
                                    <Icon.X
                                        width={24}
                                        height={24}
                                        strokeWidth={3}
                                        color={Color.primary}
                                    />
                                    <Text style={styles.textBtn}>Cancel</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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

                        <View style={styles.wrapperCamera}>
                            <TouchableOpacity onPress={openModal}>
                                <Image
                                    source={camera}
                                    style={styles.iconCamera}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {renderModal()}

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
                            onPress={() => console.log('Create/Change PIN')}
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
