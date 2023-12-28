import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import BackButton from '../../components/backButton';
import React, { useEffect, useState } from 'react';
import * as Icon from 'react-native-feather';
import { theme } from '../../theme';
import InputText from '../../components/inputText';
import { SelectCountry } from 'react-native-element-dropdown';
import Button from '../../components/button';
import asyncStorage from '@react-native-async-storage/async-storage/src/AsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Cart({ navigation }) {
    const [order, setOrder] = useState(0);

    const data = [
        {
            image: require('../../assets/images/voucher-img.png'),
            label: 'Voucher 20,000 Off',
            value: '1',
        },
        {
            image: require('../../assets/images/voucher-img.png'),
            label: 'Voucher 10,000 Off',
            value: '2',
        },
        {
            image: require('../../assets/images/voucher-img.png'),
            label: 'Voucher 5,000 Off',
            value: '3',
        },
        {
            image: require('../../assets/images/voucher-img.png'),
            label: 'Voucher 20,000 Off',
            value: '4',
        },
    ];

    useEffect(() => {
        // const getData = async () => {
        //     try {
        //         const value = await asyncStorage.getItem('cartItems');
        //         if (value !== null) {
        //             console.log(value);
        //         }
        //     } catch (e) {
        //         console.error('error null data', e);
        //     }
        // };

        const getData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('cartItems');
                jsonValue != null ? JSON.parse(jsonValue) : null;
                console.log(jsonValue);
            } catch (e) {
                console.error('error null data', e);
            }
        };
        getData();
    }, []);

    const handleMinus = () => {
        setOrder(order - 1);
    };

    const handlePlus = () => {
        setOrder(order + 1);
    };

    const handleBack = () => {
        navigation.goBack();
    };

    const handleClose = () => {
        console.log('close');
    };

    const handleCheckout = () => {
        navigation.navigate('Pin');
    };

    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <BackButton onPress={handleBack} />
                <View style={styles.titleHeader}>
                    <Text style={styles.title}>Cart</Text>
                </View>
            </View>
        );
    };

    const renderCart = () => {
        return (
            <View style={styles.sectionContainer}>
                <Image
                    source={require('../../assets/images/menu-cart.png')}
                    style={styles.imageCart}
                />
                <View style={styles.menuContainer}>
                    <View style={styles.menuSection}>
                        <Text style={styles.titleMenu}>Chicken Hawaiian </Text>
                        <TouchableOpacity onPress={handleClose}>
                            <Icon.X
                                width={17}
                                height={17}
                                stroke={'red'}
                                strokeWidth={3}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.toppings}>
                        Chicken, Cheese and pineapple
                    </Text>
                    <View style={styles.priceSection}>
                        <Text style={styles.priceMenu}>Rp. 50.000</Text>
                        <View style={styles.counter}>
                            {order === 0 ? (
                                <TouchableOpacity disabled>
                                    <Icon.MinusCircle
                                        width={28}
                                        height={28}
                                        stroke={theme.grey}
                                        strokeWidth={1}
                                    />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={handleMinus}>
                                    <Icon.MinusCircle
                                        width={28}
                                        height={28}
                                        stroke={theme.primary}
                                        strokeWidth={2}
                                    />
                                </TouchableOpacity>
                            )}
                            <Text style={styles.numCounter}>{order}</Text>
                            <TouchableOpacity onPress={handlePlus}>
                                <Icon.PlusCircle
                                    width={30}
                                    height={30}
                                    fill={theme.primary}
                                    stroke="#fff"
                                    strokeWidth={2}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    const renderInformation = () => {
        return (
            <View>
                <InputText
                    labelRequired={'*'}
                    label={'Table No'}
                    icon={require('../../assets/icons/chair.png')}
                    keyboardType={'numeric'}
                    placeholder={'1'}
                />
                <InputText
                    label={'Note'}
                    placeholder={'example: extra spicy'}
                />
            </View>
        );
    };

    const handleDropdown = () => {
        console.log(data);
    };
    const renderVoucher = () => {
        return (
            <View style={styles.dropdownContainer}>
                <SelectCountry
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    imageStyle={styles.imageStyle}
                    data={data}
                    imageField={'image'}
                    labelField={'label'}
                    valueField={'value'}
                    onChange={handleDropdown}
                    maxHeight={300}
                    searchPlaceholder="Search..."
                    placeholder={'Select Voucher'}
                />
            </View>
        );
    };

    const renderSubTotal = () => {
        return (
            <View style={styles.subtotalContainer}>
                <View style={styles.subtotalStyle}>
                    <Text style={styles.textSubtotal}>Subtotal</Text>
                    <Text style={styles.textSubtotal}>Rp. 155.000</Text>
                </View>
                <View style={styles.totalStyle}>
                    <View style={styles.subtotalStyle}>
                        <Text style={styles.textSubtotal}>Total</Text>
                        <Text style={styles.textItem}>(2 items)</Text>
                    </View>
                    <Text style={styles.textSubtotal}>Rp. 155.000</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {renderHeader()}
                <View style={styles.sectionWrapper}>
                    {renderCart()}
                    {renderCart()}
                    {renderInformation()}
                    {renderVoucher()}
                    {renderSubTotal()}
                </View>
                <View style={styles.buttonCheckout}>
                    <Button
                        title={'CHECKOUT'}
                        titleStyle={styles.titleStyle}
                        onPress={handleCheckout}
                    />
                </View>
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
    headerContainer: {
        marginBottom: 30,
    },
    titleHeader: {
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        marginTop: 45,
        fontWeight: '500',
        fontSize: 18,
    },
    sectionWrapper: {
        paddingHorizontal: 22,
        marginBottom: 30,
    },
    sectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 27,
    },
    imageCart: {
        width: 82,
        height: 82,
        borderRadius: 20,
    },
    menuContainer: {
        width: 225,
        marginLeft: 21,
    },
    menuSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleMenu: {
        fontSize: 18,
        fontWeight: '900',
    },
    toppings: {
        fontSize: 14,
        fontWeight: '400',
        color: '#A9A7B5',
    },
    priceSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    priceMenu: {
        color: theme.secondary,
        fontSize: 16,
        fontWeight: '900',
    },
    counter: {
        width: 90,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    numCounter: {
        fontWeight: '900',
        fontSize: 16,
    },
    tableController: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    titleTable: {
        fontSize: 18,
        fontWeight: '900',
        marginRight: 8,
    },
    dropdownContainer: {
        marginTop: 30,
    },
    dropdown: {
        height: 65,
        borderColor: theme.grey,
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
    },
    placeholderStyle: {
        fontWeight: '500',
        color: theme.grey,
    },
    selectedTextStyle: {
        fontSize: 16,
        marginLeft: 12,
        fontWeight: '500',
    },
    imageStyle: {
        marginLeft: 12,
        width: 36,
    },
    subtotalContainer: {
        marginTop: 35,
    },
    subtotalStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    totalStyle: {
        borderTopWidth: 1,
        borderColor: theme.grey,
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    textSubtotal: {
        fontWeight: '500',
        fontSize: 16,
    },
    textItem: {
        fontWeight: '300',
        fontSize: 14,
        color: theme.grey,
        marginLeft: 8,
    },
    buttonCheckout: {
        alignItems: 'center',
        marginBottom: 80,
    },
    titleStyle: {
        fontWeight: '900',
        fontSize: 15,
    },
});
export default Cart;
