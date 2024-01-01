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
import bgProfile from '../../assets/images/bg-profile.png';
import card from '../../assets/images/card.png';
import xfood from '../../assets/images/xfood.png';
import camera from '../../assets/icons/camera.png';
import dollar from '../../assets/icons/dollar.png';
import basket from '../../assets/icons/basket.png';
import Color from '../../assets/Color';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect, useState } from 'react';
import { ServiceContext } from '../../context/ServiceContext';
import { userAction } from '../../slices/userSlice';
import Button from '../../components/button';
import * as ImagePicker from 'expo-image-picker';
import * as Icon from 'react-native-feather';
import { loyaltyPointAction } from '../../slices/loyaltyPointSlice';

function Profile({ navigation }) {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.user);
    const { loyaltyPoints } = useSelector((state) => state.loyaltyPoint);
    const { userService, loyaltyPointService } = useContext(ServiceContext);
    const [image, setImage] = useState();
    const [modalVisible, setModalVisible] = useState(false);

    const imageUrl =
        'https://pixabay.com/get/g1905cc00441dc61d2c96b34edd2216241e5cdb87dfebe3fa18c7ee099198466cf6c52eed7f0fdd476deefee6b71574ecf0813154b02c103e1a0d4ed36be602b72906916bfc382c102a0b45d5b70a99ce_640.png';

    useEffect(() => {
        const onGetUserByPhoneNumber = () => {
            const phoneNumber = '+6285201205272';
            try {
                dispatch(
                    userAction(async () => {
                        const result =
                            await userService.fetchUserByPhoneNumber(
                                phoneNumber,
                            );
                        return result;
                    }),
                );

                if (users.profilePhoto) {
                    setImage(`data:image/jpeg;base64,${users.profilePhoto}`);
                } else {
                    setImage(imageUrl);
                }
            } catch (e) {
                console.error('Error fetching user data: ', e);
            }
        };

        const onGetLoyaltyPointAmount = () => {
            try {
                dispatch(
                    loyaltyPointAction(async () => {
                        const result =
                            loyaltyPointService.fetchLoyaltyPointById(
                                users.loyaltyPointID,
                            );
                        return result;
                    }),
                );
            } catch (e) {
                console.error('Error fetching loyalty point data: ', e);
            }
        };
        onGetUserByPhoneNumber();
        onGetLoyaltyPointAmount();
    }, [dispatch, users.length, userService]);

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
            // update displayed image
            setImage(image);
            closeModal();
        } catch (e) {
            throw e;
        }
    };

    const handleLogout = () => {
        console.log('logout');
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
                    </View>
                </View>

                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 55,
                    }}
                >
                    <Text style={styles.name}>
                        {users.firstName} {users.lastName}
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
                            {loyaltyPoints.loyaltyPointAmount}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    const renderEditProfile = () => {
        return (
            <View style={styles.editProfileContainer}>
                <View style={styles.bioEditProfile}>
                    <Text style={styles.name}>
                        {users.firstName} {users.lastName}
                    </Text>
                    <Text style={styles.textSecond}>{users.accountEmail}</Text>
                    <Text style={styles.textSecond}>{users.phoneNumber}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('EditProfile')}
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
                        <Text style={styles.textSecond}>Rp 37,000</Text>
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
            <TouchableOpacity
                style={{ width: 50 }}
                onPress={() => {
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
                                onPress: () => {
                                    handleLogout();
                                },
                            },
                        ],
                        { cancelable: false },
                    );
                }}
            >
                <Text style={styles.logout}>Logout</Text>
            </TouchableOpacity>
        );
    };

    const renderCompleteProfile = () => {
        return (
            <Button
                title={'Complete Profile'}
                buttonStyle={styles.customButton}
                titleStyle={styles.customTitle}
                onPress={() => navigation.navigate('CompleteProfile')}
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
                    {users.ktpID ? (
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
    btnEditProfile: {},
    outerCircle: {
        position: 'absolute',
        height: 108,
        width: 108,
        borderRadius: 108 / 2,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    cameraWrapper: {
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
    logout: {
        color: Color.primary,
        fontWeight: '700',
        fontSize: 15,
        marginTop: 13,
        marginBottom: 28,
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
