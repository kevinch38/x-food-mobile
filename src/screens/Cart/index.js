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
import { useDispatch, useSelector } from 'react-redux';
import {
    addToCart,
    removeAllById,
    removeFromCart,
    selectCartItems,
    selectCartItemsById,
    selectCartTotal,
} from '../../slices/cartSlice';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { userRegisterAction } from '../../slices/userSlice';
import orderService from '../../services/OrderService';
import axios from 'axios';

function Cart({ navigation }) {
    const dispatch = useDispatch();
    const [order, setOrder] = useState(0);
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const [groupedItems, setGroupedItems] = useState({});
    const { users } = useSelector((state) => state.user);
    const { selectedBranch } = useSelector((state) => state.merchantBranch);
    const [sale, setSale] = useState('');

    const totalItems = useSelector((state) =>
        selectCartItemsById(state, cartItems.itemID),
    );

    const data = [
        {
            image: require('../../assets/images/voucher-img.png'),
            label: 'Voucher 20,000 Off',
            value: 20000,
        },
        {
            image: require('../../assets/images/voucher-img.png'),
            label: 'Voucher 10,000 Off',
            value: 10000,
        },
        {
            image: require('../../assets/images/voucher-img.png'),
            label: 'Voucher 5,000 Off',
            value: 5000,
        },
    ];

    const Schema = yup.object().shape({
        tableNumber: yup.number().required('No Table Required'),
    });

    const {
        values,
        errors,
        touched,
        dirty,
        isValid,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        setValues,
    } = useFormik({
        initialValues: {
            accountID: null,
            orderValue: 0,
            notess: '',
            tableNumber: 0,
            branchID: '',
            orderItems: [],
        },
        onSubmit: async (values) => {
            if (users.accountID) {
                try {
                    const orderItems = [];
                    cartItems.forEach((cartItem) => {
                        const existingItem = orderItems.find(
                            (item) => item.itemId === cartItem.itemID,
                        );
                        if (existingItem) {
                            existingItem.qty += 1;
                        } else {
                            orderItems.push({
                                itemId: cartItem.itemID,
                                qty: 1,
                            });
                        }
                    });

                    const update = {
                        accountID: users.accountID,
                        orderValue: cartTotal - sale,
                        notes: values.notess,
                        tableNumber: values.tableNumber,
                        branchID: selectedBranch.branchID,
                        orderItems: orderItems,
                    };
                    // console.log(update);

                    console.log(update);
                    const response = await axios.post(
                        'http://10.0.2.2:8087/api/orders',
                        update,
                    );
                    console.log(response);
                } catch (e) {
                    console.error(e);
                }
            }
        },
        validationSchema: Schema,
    });

    const handleIncrease = (item) => {
        dispatch(addToCart(item));
    };

    const handleDecrease = (item) => {
        dispatch(removeFromCart({ id: item.itemID }));
    };

    useEffect(() => {
        const items = cartItems.reduce((group, item) => {
            if (group[item.itemID]) {
                group[item.itemID].push(item);
            } else {
                group[item.itemID] = [item];
            }
            return group;
        }, {});
        setGroupedItems(items);
    }, [cartItems]);

    const handleBack = () => {
        navigation.navigate('Menu');
    };

    const handleClose = (itemId) => {
        dispatch(removeAllById({ id: itemId }));
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
        return Object.entries(groupedItems).map(([key, items]) => {
            const item = items[0];
            return (
                <View style={styles.sectionContainer} key={key}>
                    <Image
                        source={{ uri: `data:image/jpeg;base64,${item.image}` }}
                        style={styles.imageCart}
                    />
                    <View style={styles.menuContainer}>
                        <View style={styles.menuSection}>
                            <Text style={styles.titleMenu}>
                                {item.itemName}
                            </Text>
                            <TouchableOpacity
                                onPress={() => handleClose(item.itemID)}
                            >
                                <Icon.X
                                    width={17}
                                    height={17}
                                    stroke={'red'}
                                    strokeWidth={3}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.toppings}>
                            {item.itemDescription}
                        </Text>
                        <View style={styles.priceSection}>
                            <Text style={styles.priceMenu}>
                                Rp.{' '}
                                {item.isDiscounted
                                    ? item.discountedPrice
                                    : item.initialPrice}
                            </Text>
                            <View style={styles.counter}>
                                {order === items.length ? (
                                    <TouchableOpacity disabled>
                                        <Icon.MinusCircle
                                            width={28}
                                            height={28}
                                            stroke={theme.grey}
                                            strokeWidth={1}
                                        />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        onPress={() => handleDecrease(item)}
                                    >
                                        <Icon.MinusCircle
                                            width={28}
                                            height={28}
                                            stroke={theme.primary}
                                            strokeWidth={2}
                                        />
                                    </TouchableOpacity>
                                )}
                                <Text style={styles.numCounter}>
                                    {items.length}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => handleIncrease(item)}
                                >
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
        });
    };

    const renderInformation = () => {
        return (
            <View>
                <InputText
                    labelRequired={'*'}
                    label={'Table No'}
                    icon={require('../../assets/icons/chair.png')}
                    keyboardType={'numeric'}
                    placeholder={'1                                     '}
                    value={values.tableNumber}
                />
                <InputText
                    label={'Note'}
                    placeholder={'example: extra spicy'}
                    value={values.notess}
                />
            </View>
        );
    };
    //
    // const handleDropdown = () => {
    //     console.log(data);
    // };
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
                    valueField={data.value}
                    // onChange={handleDropdown}
                    maxHeight={300}
                    searchPlaceholder="Search..."
                    placeholder={'Select Voucher'}
                    value={data.value}
                    onChange={(item) => {
                        setSale(item.value);
                    }}
                />
            </View>
        );
    };

    const renderSubTotal = () => {
        return (
            <View style={styles.subtotalContainer}>
                <View style={styles.subtotalStyle}>
                    <Text style={styles.textSubtotal}>Subtotal</Text>
                    <Text style={styles.textSubtotal}>Rp. {cartTotal}</Text>
                </View>
                {sale ? (
                    <View style={styles.subtotalStyle}>
                        <Text style={styles.textSubtotal}>Voucher</Text>
                        <Text style={styles.textSale}>Rp.- {sale}</Text>
                    </View>
                ) : (
                    <View style={{ display: 'none' }} />
                )}
                <View style={styles.totalStyle}>
                    <View style={styles.subtotalStyle}>
                        <Text style={styles.textSubtotal}>Total</Text>
                        <Text style={styles.textItem}>{}</Text>
                    </View>
                    <Text style={styles.textSubtotal}>
                        Rp. {sale ? cartTotal - sale : cartTotal}
                        {/*{users.vouchers*/}
                        {/*    ? cartTotal - users.vouchers.voucher_value*/}
                        {/*    : cartTotal}*/}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/*<Button title={'tt'} onPress={console.log(selectedBranch)} />*/}
            <ScrollView>
                {renderHeader()}
                <View style={styles.sectionWrapper}>
                    {renderCart()}
                    {renderInformation()}
                    {renderVoucher()}
                    {renderSubTotal()}
                </View>
                <View style={styles.buttonCheckout}>
                    <Button
                        title={'CHECKOUT'}
                        titleStyle={styles.titleStyle}
                        onPress={handleSubmit}
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
    textSale: {
        fontWeight: '500',
        fontSize: 16,
        color: 'red',
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
