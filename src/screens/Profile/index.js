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
import BackButton from '../../components/backButton';
import Button from '../../components/button';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect, useState } from 'react';
import { ServiceContext } from '../../context/ServiceContext';
import { userAction } from '../../slices/userSlice';

function Profile({ navigation }) {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.user);
    const { userService } = useContext(ServiceContext);

    useEffect(() => {
        const onGetUserByPhoneNumber = async () => {
            await dispatch(
                userAction(() => userService.fetchUserByPhoneNumber('1')),
            );
        };
        onGetUserByPhoneNumber();
    }, [dispatch, userService]);

    const handleEditProfile = () => {
        navigation.navigate('EditProfile');
    };

    const handleBack = () => {
        console.log('back');
    };

    const handleCompleteProfile = () => {
        navigation.navigate('CompleteProfile');
    };

    const handleLogout = () => {
        console.log('logout');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <BackButton onPress={handleBack} />
                <View style={{ alignItems: 'center' }}>
                    <Image source={bgProfile} style={styles.bgProfile} />
                </View>

                <View style={styles.profile}>
                    <View style={styles.outerCircle}>
                        <Image source={photo} style={styles.photo} />
                        <View style={styles.cameraWrapper}>
                            <Image source={camera} style={styles.iconCamera} />
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

                <View style={styles.wrapper}>
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
                            <Text style={styles.textSecond}>
                                {users.accountEmail}
                            </Text>
                            <Text style={styles.textSecond}>
                                {users.phoneNumber}
                            </Text>
                        </View>
                        <Text onPress={handleEditProfile} style={styles.edit}>
                            Edit Profile
                        </Text>
                    </View>
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
                        <Text style={styles.textTopUp}>TOP UP</Text>
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
                    <View style={{ alignItems: 'center', marginBottom: 50 }}>
                        <Button
                            title={'Complete Profile'}
                            style={styles.customButton}
                            onPress={handleCompleteProfile}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
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
        fontWeight: 900,
        fontSize: 15,
    },
});

export default Profile;
