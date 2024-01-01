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
} from 'react-native';
import bgProfile from '../../assets/images/bg-profile.png';
import photo from '../../assets/images/profile.png';
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

function Profile({ navigation }) {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.user);
    const { userService } = useContext(ServiceContext);
    const phoneNumber = useSelector((state) => state.user.phoneNumber);

    useEffect(() => {
        const onGetUserByPhoneNumber = async () => {
            await dispatch(
                userAction(() =>
                    userService.fetchUserByPhoneNumber(phoneNumber),
                ),
            );
        };
        onGetUserByPhoneNumber();
    }, [dispatch, userService]);

    const handleEditProfile = () => {
        navigation.navigate('EditProfile');
    };

    const handleTopUp = () => {
        navigation.navigate('TopUp');
    };

    const handleCompleteProfile = () => {
        navigation.navigate('CompleteProfile');
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

    const renderProfile = () => {
        return (
            <View>
                <View style={styles.profile}>
                    <View style={styles.outerCircle}>
                        <Image source={photo} style={styles.photo} />
                        <View style={styles.cameraWrapper}>
                            <TouchableOpacity onPress={handleEditProfile}>
                                <Image
                                    source={camera}
                                    style={styles.iconCamera}
                                />
                            </TouchableOpacity>
                        </View>
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
                        <Text style={styles.price}>980</Text>
                    </View>
                </View>
            </View>
        );
    };

    const renderEditProfile = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 20,
                }}
            >
                <View>
                    <Text style={styles.name}>
                        {users.firstName} {users.lastName}
                    </Text>
                    <Text style={styles.textSecond}>{users.accountEmail}</Text>
                    <Text style={styles.textSecond}>{users.phoneNumber}</Text>
                </View>
                <TouchableOpacity onPress={handleEditProfile}>
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
                    <TouchableOpacity onPress={handleTopUp}>
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
                onPress={handleCompleteProfile}
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
    outerCircle: {
        position: 'absolute',
        height: 108,
        width: 108,
        borderRadius: 108 / 2,
        backgroundColor: 'white',
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
        color: Color.secondary,
        fontWeight: '700',
        fontSize: 15,
        marginTop: 13,
        marginBottom: 28,
    },
    customButton: {
        backgroundColor: Color.secondary,
    },
    customTitle: {
        fontWeight: 900,
        fontSize: 15,
    },
});

export default Profile;
