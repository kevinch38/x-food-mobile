import {
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import BackButton from '../../components/backButton';
import iconBag from '../../assets/icons/bag.png';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ServiceContext } from '../../context/ServiceContext';
import Logo from '../../assets/images/mechant-logo.png';
import { selectedMerchantBranchAction } from '../../slices/merchantBranch';
import Loading from '../../components/loading';
import CardMenu from '../../components/card/CardMenu';
import { selectCartTotal } from '../../slices/cartSlice';
import { formatIDRCurrency } from '../../utils/utils';

const Menu = ({ navigation }) => {
    const dispatch = useDispatch();
    const branch = useSelector((state) => state.merchantBranch.selectedBranch);
    const merchant = useSelector((state) => state.merchant.selectedMerchant);
    const { merchantBranchService } = useContext(ServiceContext);
    const route = useRoute();
    const branchId = route.params?.branchId;
    const cartTotal = useSelector(selectCartTotal);
    const [isLoading, setIsLoading] = useState(true);

    const handleToMenuDetail = (item) => {
        navigation.navigate('MenuDetail', {
            item,
        });
    };

    const handleToCart = () => {
        navigation.navigate('Cart');
    };
    const handleBack = () => {
        navigation.navigate('Merchant');
    };

    useEffect(() => {
        const onGetMerchantBranch = async () => {
            try {
                setIsLoading(true);
                await dispatch(
                    selectedMerchantBranchAction(() =>
                        merchantBranchService.fetchMerchantBranchById(branchId),
                    ),
                );

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching merchant:', error);
                setIsLoading(false);
            }
        };
        onGetMerchantBranch();
    }, [dispatch, merchantBranchService]);

    return (
        <SafeAreaView style={styles.wrapper}>
            {isLoading ? (
                <Loading />
            ) : (
                <View style={styles.container}>
                    <ScrollView style={{ marginBottom: '21%' }}>
                        <BackButton onPress={handleBack} />
                        <View style={styles.wrapperProfile}>
                            <View style={styles.outerCircle}>
                                <View style={styles.outerInnerCircle}>
                                    <Image
                                        source={{
                                            uri: `data:image/jpeg;base64,${merchant.logoImage}`,
                                        }}
                                        style={styles.logo}
                                    />
                                </View>
                            </View>
                        </View>
                        <View
                            style={{
                                width: 145,
                                position: 'absolute',
                                top: 110,
                                left: '10%',
                            }}
                        >
                            <Text style={{ fontSize: 40, fontWeight: '900' }}>
                                {merchant.merchantName}
                            </Text>
                            <Text
                                style={{
                                    width: 'min-content',
                                    marginTop: 10,
                                    fontSize: 19,
                                    fontWeight: '900',
                                    color: '#9796A1',
                                }}
                            >
                                {branch.branchName}
                            </Text>
                        </View>
                        <View
                            style={{ width: '100%', marginVertical: '5%' }}
                        ></View>
                        {Array.isArray(branch.items) &&
                            branch.items.length > 0 &&
                            branch.items.map((item, idx) => {
                                return (
                                    <CardMenu
                                        key={idx}
                                        onPress={() => handleToMenuDetail(item)}
                                        isDiscount={item.isDiscounted}
                                        discountedPrice={item.discountedPrice}
                                        initialPrice={item.initialPrice}
                                        itemName={item.itemName}
                                        itemDescription={item.itemDescription}
                                        image={item.image}
                                        itemStock={item.itemStock}
                                    />
                                );
                            })}
                    </ScrollView>
                    <View
                        style={{
                            height: 'max-content',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            position: 'absolute',
                            bottom: 0,
                        }}
                    >
                        <View
                            style={{
                                height: '100%',
                                width: '500',
                            }}
                        >
                            <TouchableOpacity onPress={handleToCart}>
                                <Image
                                    source={iconBag}
                                    style={{
                                        height: 35,
                                        width: 35,
                                        marginVertical: '20%',
                                        marginLeft: '20%',
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}
                        >
                            <View
                                style={{
                                    height: '100%',
                                    width: 'min-content',
                                    marginTop: '15%',
                                    marginRight: '3%',
                                }}
                            >
                                <Text
                                    style={{
                                        width: 'min-content',
                                        textAlign: 'center',
                                        fontWeight: '500',
                                        fontSize: 16,
                                    }}
                                >
                                    {formatIDRCurrency(cartTotal)}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={handleToCart}
                                style={{
                                    height: '100%',
                                    width: 128,
                                    backgroundColor: '#F08D18',
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        marginTop: '25%',
                                        fontWeight: '500',
                                        fontSize: 20,
                                        color: '#fff',
                                    }}
                                >
                                    Checkout
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
    },
    wrapperProfile: {
        height: 270,
        width: 314,
        marginTop: '5%',
        marginLeft: '40%',
    },
    outerCircle: {
        height: 108,
        width: 108,
        borderRadius: 108 / 2,
        backgroundColor: 'white',
    },
    outerInnerCircle: {
        height: 220,
        width: 220,
        borderRadius: 220 / 2,
        margin: 9,
        backgroundColor: '#FFC529',
        shadowColor: '#FFC529',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,

        elevation: 16,
    },
    logo: {
        resizeMode: 'contain',
        height: 190,
        width: 190,
        borderRadius: 190 / 2,
        margin: 15,
    },
});

export default Menu;
