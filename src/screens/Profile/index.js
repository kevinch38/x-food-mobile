import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Modal,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useContext, useEffect, useState } from 'react';
import { ServiceContext } from '../../context/ServiceContext';
import { userAction } from '../../slices/userSlice';
import { loyaltyPointAction } from '../../slices/loyaltyPointSlice';
import Button from '../../components/button';
import * as ImagePicker from 'expo-image-picker';
import * as Icon from 'react-native-feather';
import bgProfile from '../../assets/images/bg-profile.png';
import card from '../../assets/images/card.png';
import xfood from '../../assets/images/xfood.png';
import dollar from '../../assets/icons/dollar.png';
import basket from '../../assets/icons/basket.png';
import Color from '../../assets/Color';
import camera from '../../assets/icons/camera.png';
import axios from 'axios';
import { fetchBalanceAction } from '../../slices/balanceSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../api/axiosInstance';
import { formatIDRCurrency } from '../../utils/utils';
import { apiBaseUrl } from '../../api/xfood';

function Profile({ navigation }) {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.user);
    const { phoneNumber } = useSelector((state) => state.ui);
    const { loyaltyPoints } = useSelector((state) => state.loyaltyPoint);
    const { balance } = useSelector((state) => state.balance);
    const { userService, loyaltyPointService, balanceService } =
        useContext(ServiceContext);
    const [image, setImage] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const { authService } = useContext(ServiceContext);

    const imageUrl =
        'https://pixabay.com/get/g1905cc00441dc61d2c96b34edd2216241e5cdb87dfebe3fa18c7ee099198466cf6c52eed7f0fdd476deefee6b71574ecf0813154b02c103e1a0d4ed36be602b72906916bfc382c102a0b45d5b70a99ce_640.png';

    useEffect(() => {
        const onGetLoyaltyPointAmount = () => {
            try {
                dispatch(
                    loyaltyPointAction(async () => {
                        const result =
                            loyaltyPointService.fetchLoyaltyPointById(
                                users.loyaltyPoint.loyaltyPointID,
                            );
                        return result;
                    }),
                );
            } catch (e) {
                console.error('Error fetching loyalty point data: ', e);
            }
        };

        const onGetBalanceUser = async () => {
            try {
                dispatch(
                    fetchBalanceAction(async () => {
                        const result = balanceService.fetchBalance(
                            users.balance.balanceID,
                        );
                        return result;
                    }),
                );
            } catch (e) {
                console.error('Error fetchin balance data: ', e);
            }
        };

        onGetBalanceUser();
        onGetUserByPhoneNumber();
        onGetLoyaltyPointAmount();
    }, [
        dispatch,
        userService,
        loyaltyPointService,
        balanceService,
        Object.keys(users).length,
    ]);

    const onGetUserByPhoneNumber = () => {
        try {
            dispatch(
                userAction(async () => {
                    const result =
                        await userService.fetchUserByPhoneNumber(phoneNumber);

                    if (users.profilePhoto) {
                        setImage(
                            `data:image/jpeg;base64,${result.data.profilePhoto}`,
                        );
                    } else {
                        setImage(imageUrl);
                    }
                    return result;
                }),
            );
        } catch (e) {
            console.error('Error fetching user data: ', e);
        }
    };

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
                let localUri = result.assets[0].uri;
                setImage(localUri);
                let filename = localUri.split('/').pop();

                let match = /\.(\w+)$/.exec(filename);
                let type = match ? `image/${match[1]}` : `image`;

                let formData = new FormData();
                formData.append('accountID', users.accountID);
                formData.append('profilePhoto', {
                    uri: localUri,
                    name: filename,
                    type,
                });

                await axiosInstance
                    .put(`${apiBaseUrl}/api/users/profile/photo`, formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    })
                    .then(async (res) => {
                        setImage(res.data.profilePhoto);

                        try {
                            await onGetUserByPhoneNumber();
                        } catch (error) {
                            console.error(
                                'Error refetching user data after profile photo update:',
                                error,
                            );
                        }

                        const update = { data: { ...users, temp: 'a' } };
                        return update;
                    })
                    .catch((err) => {
                        console.log('Error update user data: ', err.response);
                    });
                closeModal();
            }
        } catch (e) {
            alert('Error uploading image: ' + e.message);
            closeModal();
        }
    };

    const handleLogout = () => {
        Alert.alert(
            'Log out',
            'Do you want to logout?',
            [
                {
                    text: 'Cancel',
                    onPress: () => {
                        return null;
                    },
                },
                {
                    text: 'Log out',
                    onPress: async () => {
                        await authService.logout();
                        await AsyncStorage.removeItem('phoneNumber');
                        navigation.replace('Login');
                    },
                },
            ],
            { cancelable: false },
        );
    };

    const renderHeader = () => {
        return (
            <View>
                <View style={{ alignItems: 'center' }}>
                    <Image source={bgProfile} style={styles.bgProfile} />
                </View>
            </View>
        );
    };

    const renderProfile = () => {
        return (
            <View>
                <View style={styles.profile}>
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
                        <View style={styles.cameraWrapper}>
                            <TouchableOpacity onPress={openModal}>
                                <View style={styles.circleCamera}>
                                    <Image
                                        source={camera}
                                        style={styles.iconCamera}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {renderModal()}

                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 55,
                    }}
                >
                    <Text style={styles.name}>
                        {users?.firstName} {users?.lastName}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: 8,
                            alignItems: 'center',
                        }}
                    >
                        <Image source={dollar} style={styles.iconDollar} />
                        <Text style={styles.price}>
                            {loyaltyPoints?.loyaltyPointAmount}
                        </Text>
                    </View>
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
            <View style={styles.editProfileContainer}>
                <View style={styles.bioEditProfile}>
                    <Text style={styles.name}>
                        {users?.firstName} {users?.lastName}
                    </Text>
                    <Text style={styles.textSecond}>{users?.accountEmail}</Text>
                    <Text style={styles.textSecond}>{users?.phoneNumber}</Text>
                </View>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('EditProfile', {
                            users,
                        })
                    }
                >
                    <Text style={styles.edit}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderTopUp = () => {
        return (
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        marginBottom: 14,
                    }}
                >
                    <View>
                        <Text style={styles.name}>Balance</Text>
                        <Text style={styles.textSecond}>
                            {formatIDRCurrency(balance.totalBalance)}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('TopUp')}
                    >
                        <Text style={styles.textTopUp}>TOP UP</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Image source={card} style={styles.imgCard} />
                    <Image source={basket} style={styles.iconBasket} />
                    <Image source={xfood} style={styles.imgXFood} />
                </View>
            </View>
        );
    };

    const renderLogout = () => {
        return (
            <View style={styles.logoutContainer}>
                <TouchableOpacity onPress={() => handleLogout()}>
                    <Text style={styles.logout}>Logout</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderCompleteProfile = () => {
        return (
            <Button
                title={'Complete Profile'}
                buttonStyle={styles.customButton}
                titleStyle={styles.customTitle}
                onPress={() =>
                    navigation.navigate('CompleteProfile', { users })
                }
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                {renderHeader()}
                {renderProfile()}

                <View style={styles.wrapper}>
                    {renderEditProfile()}
                    {renderTopUp()}
                    {renderLogout()}
                    {users?.ktpID ? (
                        <></>
                    ) : (
                        <View
                            style={{ alignItems: 'center', marginBottom: 50 }}
                        >
                            {renderCompleteProfile()}
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#fff',
    },
    wrapper: {
        paddingHorizontal: 20,
    },
    profile: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 154,
        marginBottom: 24,
    },
    editProfileContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    bioEditProfile: {
        flex: 0.95,
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
    cameraWrapper: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        right: 10,
        bottom: 2,
    },
    circleCamera: {
        backgroundColor: 'white',
        width: 30,
        height: 30,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
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
    iconCamera: {
        width: 14,
        height: 12.9,
    },
    iconBasket: {
        position: 'absolute',
        width: 61,
        height: 61,
        left: 0,
        top: 0,
        marginTop: 16,
        marginLeft: 16,
    },
    iconDollar: {
        width: 25,
        height: 25,
    },
    imgXFood: {
        position: 'absolute',
        width: 133,
        height: 60,
        right: 0,
        marginRight: 18,
    },
    imgCard: {
        width: '100%',
        height: 193,
        borderRadius: 6,
    },
    name: {
        fontWeight: '900',
        fontSize: 20,
        marginTop: 13,
    },
    price: {
        fontWeight: '400',
        fontSize: 16,
        marginLeft: 12,
    },
    textSecond: {
        marginTop: 6,
        fontWeight: '500',
        fontSize: 17,
    },
    textTopUp: {
        fontWeight: '400',
        fontSize: 16,
        color: '#5681A5',
    },
    edit: {
        fontWeight: '400',
        fontSize: 14,
        color: '#9796A1',
    },
    logoutContainer: {
        width: 85,
        marginTop: 13,
        marginBottom: 28,
    },
    logout: {
        color: Color.primary,
        paddingVertical: 4,
        fontWeight: '700',
        fontSize: 15,
    },
    customButton: {
        backgroundColor: Color.primary,
    },
    customTitle: {
        fontWeight: 900,
        fontSize: 15,
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

export default Profile;
