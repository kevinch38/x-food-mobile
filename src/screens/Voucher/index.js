import React, { useContext, useEffect, useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    BackHandler,
} from 'react-native';
import VoucherCard from '../../components/card/VoucherCard';
import Starbuck from '../../../assets/images/starbuck.png';
import BackButton from '../../components/backButton';
import { useDispatch, useSelector } from 'react-redux';
import { ServiceContext } from '../../context/ServiceContext';
import { useNavigation } from '@react-navigation/native';
import { loyaltyPointAction } from '../../slices/loyaltyPointSlice';
import UserService from '../../services/UserService';
import Button from '../../components/button';
import Color from '../../assets/Color';

const Voucher = ({ navigation }) => {
    const navigate = useNavigation();
    const phoneNumber = useSelector((state) => state.ui.phoneNumber);
    const userService = UserService;
    const [userData, setUserData] = useState({});

    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.user);
    const { loyaltyPoints } = useSelector((state) => state.loyaltyPoint);
    const { loyaltyPointService } = useContext(ServiceContext);
    const [refetch, setRefecth] = useState(true);

    const handleRedeemPress = () => {
        navigate.navigate('Redeem');
    };

    useEffect(() => {
        isRefetch();
    }, []);

    useEffect(() => {
        if (refetch) {
            fetchUserData(phoneNumber);
        dispatch(
            loyaltyPointAction(async () => {
                const result = await loyaltyPointService.fetchLoyaltyPointById(
                    users.loyaltyPoint.loyaltyPointID,
                );
                return result;
            }),
        );
            setRefecth(false);
        }
    }, [phoneNumber]);

    const fetchUserData = async (phoneNumber) => {
        try {
            const fetchedUserData =
                await userService().fetchUserByPhoneNumber(phoneNumber);
            setUserData(fetchedUserData.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

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

        if (refetch) {
            onGetLoyaltyPointAmount();
            setRefecth(false);
        }
    }, [dispatch, loyaltyPointService]);

    const isRefetch = () => {
        setRefecth(true);
    };

    return (
        <SafeAreaView style={styles.wrapper}>
            <View>
                <Image
                    source={require('../../../assets/images/elipse3.png')}
                    style={{ position: 'absolute', top: 0 }}
                />
                <Image
                    source={require('../../../assets/images/elipse.png')}
                    style={{ position: 'absolute', top: 0 }}
                />
                {/* <BackButton onPress={handleBack} /> */}
                <Image
                    source={require('../../../assets/images/elipse2.png')}
                    style={{ position: 'absolute', top: 0, right: 0 }}
                />
            </View>
            <View style={{ marginHorizontal: '5%' }}>
                <Text
                    style={{ marginTop: 100, fontSize: 18, fontWeight: '700' }}
                >
                    Points
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: -30,
                    }}
                >
                    <View style={{ flexDirection: 'row', marginTop: 25 }}>
                        <Image
                            source={require('../../../assets/images/Coin.png')}
                        />
                        <Text style={{ alignSelf: 'center', fontSize: 18 }}>
                            {loyaltyPoints.loyaltyPointAmount}
                        </Text>
                    </View>
                    <Button
                        buttonStyle={{
                            width: 110,
                            height: 30,
                            marginTop: 25,
                            backgroundColor:
                                loyaltyPoints.loyaltyPointAmount <= 0
                                    ? Color.disabled
                                    : Color.primary,
                        }}
                        title={'Reedem'}
                        disabled={loyaltyPoints.loyaltyPointAmount <= 0}
                        onPress={handleRedeemPress}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: 18, fontWeight: '700' }}>
                        My Vouchers
                    </Text>
                    <ScrollView>
                        {Array.isArray(userData.vouchers) &&
                            userData.vouchers.length > 0 &&
                            userData.vouchers.map((item, idx) => {
                                return (
                                    <VoucherCard
                                        key={idx}
                                        title={item.promotionName}
                                        content={item.promotionDescription}
                                        image={item.logoImage}
                                        expired={item.expiredDate}
                                    />
                                );
                            })}
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#fff',
    },
});

export default Voucher;
