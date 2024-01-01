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
} from 'react-native';
import React, { useContext, useEffect } from 'react';
import VoucherCard from '../../components/card/VoucherCard';
import Starbuck from '../../../assets/images/starbuck.png';
import BackButton from '../../components/backButton';
import { useDispatch, useSelector } from 'react-redux';
import { ServiceContext } from '../../context/ServiceContext';
import { userAction } from '../../slices/userSlice';
import { useNavigation } from '@react-navigation/native';

const Voucher = ({ navigation }) => {
    const navigate = useNavigation();

    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.user);
    const { userService } = useContext(ServiceContext);
    const handleRedeemPress = () => {
        navigate.navigate('Redeem');
    };

    useEffect(() => {
        const onGetUserByPhoneNumber = async () => {
            await dispatch(
                userAction(() =>
                    userService.fetchUserByPhoneNumber('+62821948080'),
                ),
            );
        };
        onGetUserByPhoneNumber();
    }, [dispatch, userService]);

    return (
        <SafeAreaView style={styles.wrapper}>
            {/*<Button title={'test'} onPress={console.log(users)} />*/}
            <View>
                <Image
                    source={require('../../../assets/images/elipse3.png')}
                    style={{ position: 'absolute', top: 0 }}
                />
                <Image
                    source={require('../../../assets/images/elipse.png')}
                    style={{ position: 'absolute', top: 0 }}
                />
                <BackButton style />
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
                            980
                        </Text>
                    </View>
                    <TouchableOpacity style={{ marginTop: 25 }} onPress={handleRedeemPress}>
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
                        {Array.isArray(users.vouchers) &&
                            users.vouchers.length > 0 &&
                            users.vouchers.map((item, idx) => {
                                return (
                                    <VoucherCard
                                        key={idx}
                                        title={`Starbucks Rp. 30.000 Off`}
                                        content={`Some explanation of the code`}
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
