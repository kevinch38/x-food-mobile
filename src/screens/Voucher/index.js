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
    Button,
    BackHandler,
} from 'react-native';
import VoucherCard from '../../components/card/VoucherCard';
import Starbuck from '../../../assets/images/starbuck.png';
import BackButton from '../../components/backButton';
import { useDispatch, useSelector } from 'react-redux';
import { ServiceContext } from '../../context/ServiceContext';
import { useNavigation } from '@react-navigation/native';
import { loyaltyPointAction } from '../../slices/loyaltyPointSlice';
import UserService from "../../services/UserService";

const Voucher = ({ navigation }) => {
    const navigate = useNavigation();
    const phoneNumber = useSelector((state) => state.ui.phoneNumber);
    const userService = UserService;
    const [userData, setUserData] = useState({ vouchers: [] });
    

    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.user);
    const { loyaltyPoints } = useSelector((state) => state.loyaltyPoint);
    const { loyaltyPointService } = useContext(ServiceContext);
    const handleRedeemPress = () => {
        navigate.navigate('Redeem');
    };

    useEffect(() => {
        fetchUserData(phoneNumber);
    }, [phoneNumber]);

    const fetchUserData = async (phoneNumber) => {
        try {
            const fetchedUserData = await userService().fetchUserByPhoneNumber(phoneNumber);
            setUserData(fetchedUserData);
            // console.log('userData:', fetchedUserData);
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
                                users.loyaltyPointID,
                            );
                        return result;
                    }),
                );
            } catch (e) {
                console.error('Error fetching loyalty point data: ', e);
            }
        };

        onGetLoyaltyPointAmount();
    }, [dispatch, loyaltyPointService]);


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
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={require('../../../assets/images/Coin.png')}
                        />
                        <Text style={{ alignSelf: 'center', fontSize: 18 }}>
                            {loyaltyPoints.loyaltyPointAmount}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={{ marginTop: 25 }}
                        onPress={handleRedeemPress}
                        activeOpacity={0.7}
                    >
                        <Image
                            source={require('../../../assets/images/redeembutton.png')}
                        />
                    </TouchableOpacity>
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
                                        title={`Discount 20%`}
                                        content={`20% 0ff`}
                                        image={Starbuck}
                                        expired={`Will Expire on 25/10/2024`}
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
