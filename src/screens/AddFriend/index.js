import React, { useContext, useState, useEffect } from 'react';
import {
    Animated,
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Modal,
} from 'react-native';
import { BlurView } from 'expo-blur';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Template from '../../components/background';
import Color from '../../assets/Color';
import { StatusBar } from 'expo-status-bar';
import { ServiceContext } from '../../context/ServiceContext';
import BackButton from '../../components/backButton';
import fbImage from '../../assets/icons/fb.png';
import waImage from '../../assets/icons/wa.png';
import igImage from '../../assets/icons/ig.png';
import lnImage from '../../assets/icons/ln.png';
import closeIcon from '../../assets/icons/close.png';
import { useSelector } from 'react-redux';

const AddFriend = ({ navigation, route }) => {
    const phoneNumberRedux = useSelector((state) => state.ui.phoneNumber);
    const { userService, friendService } = useContext(ServiceContext);
    const [user, setUser] = useState();
    const [image, setImage] = useState();
    const [isAddFriend, setIsAddFriend] = useState(false);
    const [friendPhoneNumber, setFriendPhoneNumber] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [friendId, setFriendId] = useState();
    const [userId, setUserId] = useState();
    const [isMessage, setIsMessage] = useState(false);
    const [isInvitationSuccess, setIsInvitationSuccess] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const schema = Yup.object({
        phoneNumber: Yup.string().test(
            'phoneNumber',
            'User Not Found',
            function (value) {
                return value !== undefined && value !== null;
            },
        ),
    });

    const {
        values: { phoneNumber },
        handleBlur,
        handleSubmit,
        setFieldValue,
        errors,
        setFieldError,
    } = useFormik({
        initialValues: {
            phoneNumber: friendPhoneNumber,
        },
        onSubmit: async (values) => {
            try {
                const userResponse = await userService.fetchUserByPhoneNumber(
                    values.phoneNumber,
                );
                if (!userResponse.data) {
                    setFieldError('phoneNumber', 'User not found');
                    return;
                }
                const user =
                    await userService.fetchUserByPhoneNumber(phoneNumberRedux);
                setUserId(user.data.accountID);
                setFriendPhoneNumber(phoneNumber);
                setUser(userResponse.data);
                setFriendId(userResponse.data.accountID);
                setImage(
                    userResponse.data.profilePhoto
                        ? `data:image/jpeg;base64,${userResponse.data.profilePhoto}`
                        : `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}`,
                );
            } catch (error) {
                console.warn('Error during form submission:', error);
            }
        },
        validationSchema: schema,
    });

    const handleModalClose = () => {
        setModalVisible(!modalVisible);
        setIsInvitationSuccess(true);
        setTimeout(() => {
            setIsInvitationSuccess(false);
        }, 2000);
    };

    const handleAddFriend = async () => {
        try {
            setIsAddFriend(true);
            await friendService.addFriend({ userId, friendId });

            const update = { data: { ...result, temp: 'a' } };
            return update;
            // return result;
        } catch (error) {
            console.log(error);
            setIsMessage(true);
        }
    };

    useEffect(() => {
        setUser(null);
        setImage(null);
        setIsAddFriend(false);
        setModalVisible(false);
        setIsMessage(false);
    }, [phoneNumber]);

    return (
        <SafeAreaView style={styles.container}>
            <Template />
            <BackButton onPress={() => navigation.navigate('SplitBill')} />

            {modalVisible && (
                <BlurView intensity={20} tint="light" style={styles.blurView} />
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleModalClose}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalText}>
                                Invite Friend Via
                            </Text>
                            <TouchableOpacity onPress={handleModalClose}>
                                <Image
                                    source={closeIcon}
                                    style={styles.closeIcon}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.socialIcons}>
                            <TouchableOpacity onPress={handleModalClose}>
                                <Image source={waImage} style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleModalClose}>
                                <Image source={igImage} style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleModalClose}>
                                <Image source={lnImage} style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleModalClose}>
                                <Image source={fbImage} style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={styles.content}>
                <View>
                    <Text style={styles.heading}>Friend Search</Text>
                    <Text style={styles.subHeading}>
                        Enter friend's phone number
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="(+62)"
                        keyboardType="phone-pad"
                        onChangeText={(text) => {
                            let formattedText = text;
                            if (text.startsWith('08')) {
                                formattedText = `+62${text.substr(1)}`;
                            }
                            setFieldValue('phoneNumber', formattedText);
                        }}
                        onBlur={handleBlur('phoneNumber')}
                        value={phoneNumber}
                    />

                    {errors.phoneNumber && (
                        <Text style={styles.errorText}>
                            {errors.phoneNumber}
                        </Text>
                    )}

                    {user == undefined ? (
                        <View>
                            {errors.phoneNumber ? (
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => setModalVisible(true)}
                                >
                                    <Text style={styles.buttonText}>
                                        Invite
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={handleSubmit}
                                >
                                    <Text style={styles.buttonText}>
                                        Search
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ) : (
                        <View style={styles.center}>
                            <View style={styles.outerCircle}>
                                {image ? (
                                    <Image
                                        source={{ uri: image }}
                                        style={styles.photo}
                                    />
                                ) : (
                                    <Text style={styles.loadingText}>
                                        Loading ...
                                    </Text>
                                )}
                            </View>

                            <Text style={styles.name}>{user.firstName}</Text>

                            {isAddFriend ? (
                                <Text style={styles.addedText}>
                                    {isMessage
                                        ? 'Friend already exists'
                                        : 'Added to your Friend List'}
                                </Text>
                            ) : (
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={handleAddFriend}
                                >
                                    <Text style={styles.buttonText}>
                                        Add as Friend
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                </View>
            </View>

            {isInvitationSuccess && (
                <Text style={styles.successMessage}>Successfully invited</Text>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        height: '100%',
        backgroundColor: '#fff',
    },
    content: {
        paddingLeft: '10%',
        paddingRight: '10%',
        marginTop: '15%',
    },
    center: {
        marginTop: '10%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 35,
        fontWeight: 'bold',
        marginTop: '10%',
    },
    subHeading: {
        marginTop: '2%',
        color: Color.gray,
    },
    input: {
        height: 60,
        marginTop: 15,
        borderWidth: 1,
        borderColor: Color.gray,
        borderRadius: 10,
        padding: 10,
    },
    photo: {
        position: 'absolute',
        height: 100,
        width: 100,
        borderRadius: 100,
        margin: 9,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    button: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.primary,
        padding: 10,
        margin: '5%',
        borderRadius: 40,
        height: 50,
        width: 240,
        marginTop: '10%',
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white',
    },
    outerCircle: {
        marginBottom: '3%',
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
    errorText: {
        color: 'red',
        marginTop: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 0,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingTop: 15,
        padding: 20,
        marginTop: 100,
        width: '100%',
        height: '25%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    blurView: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 2,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    closeIcon: {
        height: 29,
        width: 29,
    },
    socialIcons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 50,
        marginTop: 30,
    },
    icon: {
        height: 50,
        width: 50,
    },
    loadingText: {
        textAlign: 'center',
        color: '#9ca3af',
    },
    addedText: {
        color: Color.primary,
        marginTop: '2%',
    },
    successMessage: {
        color: 'green',
        fontWeight: 'bold',
        marginTop: '90%',
        textAlign: 'center',
    },
});

export default AddFriend;
