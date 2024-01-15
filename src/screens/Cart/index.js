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
import React, { useContext, useEffect, useState } from 'react';
import * as Icon from 'react-native-feather';
import { theme } from '../../theme';
import InputText from '../../components/inputText';
import { SelectCountry } from 'react-native-element-dropdown';
import Button from '../../components/button';
import { useDispatch, useSelector } from 'react-redux';
import {
    addToCart,
    emptyCart,
    removeAll,
    removeFromCart,
    selectCartItems,
    selectCartTotal, setPiece,
} from '../../slices/cartSlice';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { userAction } from '../../slices/userSlice';
import { ServiceContext } from '../../context/ServiceContext';
import { createOrderAction } from '../../slices/orderSlice';
import { fetchBalanceAction } from '../../slices/balanceSlice';
import Color from '../../assets/Color';

function Cart({ navigation }) {
    const dispatch = useDispatch();
    const [order, setOrder] = useState(0);
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const [groupedItems, setGroupedItems] = useState({});
    const { users } = useSelector((state) => state.user);
    const { balance } = useSelector((state) => state.balance);
    const { selectedBranch } = useSelector((state) => state.merchantBranch);
    const [sale, setSale] = useState('');
    const [nameVoucher, setNameVoucher] = useState('');
    const { userService, orderService, balanceService } =
        useContext(ServiceContext);
    const [vouchers, setVouchers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [balanceUser, setBalanceUser] = useState(0);
    const phoneNumber = useSelector((state) => state.ui.phoneNumber);

    const totalBalance = balanceUser <= 0 ? Color.disabled : Color.primary;

    useEffect(() => {
        setVouchers(users?.vouchers);
    }, [users]);

    useEffect(() => {
        setBalanceUser(balance.totalBalance);
    }, [balance.totalBalance]);

    useEffect(() => {
        const onGetUserByPhoneNumber = async () => {
            try {
                setIsLoading(true);

                await dispatch(
                    userAction(() =>
                        userService.fetchUserByPhoneNumber(phoneNumber),
                    ),
                );

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching user:', error);
                setIsLoading(false);
            }
        };

        const onGetBalanceUser = async () => {
            try {
                dispatch(
                    fetchBalanceAction(async () => {
                        const result = balanceService.fetchBalance(
                            users.balanceID,
                        );
                        return result;
                    }),
                );
            } catch (e) {
                console.error('Error fetching balance data: ', e);
            }
        };

        onGetUserByPhoneNumber();
        onGetBalanceUser();
    }, [dispatch, userService]);

    const Schema = yup.object().shape({
        tableNumber: yup.number().required('No Table Required'),
    });

    const { values, errors, touched, handleSubmit } = useFormik({
        initialValues: {
            accountID: null,
            orderValue: 0,
            orderNote: '',
            tableNumber: 0,
            branchID: '',
            orderItems: [],
        },
        onSubmit: async (values) => {
            if (cartItems.length > 0) {
                if (users.accountID) {
                    try {
                        const groupedOrderItem = cartItems.reduce(
                            (grouped, item) => {
                                const key =
                                    item.itemID +
                                    JSON.stringify(
                                        item.itemVarieties
                                            .map(
                                                (variety) =>
                                                    variety.subVarietyID,
                                            )
                                            .sort(),
                                    );
                                if (!grouped[key]) {
                                    grouped[key] = {
                                        itemID: item.itemID,
                                        subVarieties: item.itemVarieties.map(
                                            (variety) => ({
                                                subVarietyID:
                                                    variety.subVarietyID,
                                            }),
                                        ),
                                        quantity: 0,
                                    };
                                }
                                grouped[key].quantity += 1;
                                return grouped;
                            },
                            {},
                        );

                        const result = Object.values(groupedOrderItem);

                        const orderItems = {
                            accountID: users.accountID,
                            orderValue: cartTotal - sale,
                            notes: values.orderNote,
                            tableNumber: values.tableNumber,
                            branchID: selectedBranch.branchID,
                            orderItems: result,
                        };
                        dispatch(
                            createOrderAction(async () => {
                                //         const result =
                                //             await orderService.orderItem(orderItems);
                                //         console.log(result, 'ini result');
                                //     }),
                                // );
                                try {
                                    const result =
                                        await orderService.orderItem(
                                            orderItems,
                                        );
                                    console.log(result, 'ini result');
                                    if (result.statusCode === 201) {
                                        navigation.navigate('Pin', {
                                            accountID: result.data.accountID,
                                            orderID: result.data.orderID,
                                            destination: 'Payment',
                                        });
                                        dispatch(emptyCart());
                                        return result;
                                    }
                                    return null;
                                } catch (e) {
                                    console.log('error e', e);
                                }
                            }),
                        );
                    } catch (e) {
                        console.error('error e', e);
                    }
                }
            } else {
                alert('Cart Empty');
            }
        },

        validationSchema: Schema,
    });

    const handleIncrease = (item) => {
        dispatch(addToCart(item));
    };

    const handleDecrease = (item) => {
        dispatch(
            removeFromCart({
                itemID: item.itemID,
                itemVarieties: item.itemVarieties,
            }),
        );
    };

    useEffect(() => {
        const groupedItems = cartItems.reduce((group, item) => {
            const variety = Array.isArray(item.itemVarieties)
                ? item.itemVarieties
                      .map((variety) => variety.subVarietyID)
                      .join('-')
                : 'No Variety';
            const key = item.itemID + '-' + variety;
            if (group[key]) {
                group[key].push(item);
            } else {
                group[key] = [item];
            }
            return group;
        }, {});

        const mergedGroupedItems = Object.values(groupedItems).reduce(
            (finalGroup, itemsArray) => {
                const firstItem = itemsArray[0];
                const matchingItems = finalGroup.find(
                    (groupedItem) =>
                        groupedItem.itemID === firstItem.itemID &&
                        groupedItem.itemVarieties.join('-') ===
                            firstItem.itemVarieties
                                .map((variety) => variety.subVarietyID)
                                .join('-'),
                );

                if (matchingItems) {
                    matchingItems.items.push(...itemsArray);
                } else {
                    finalGroup.push({
                        itemID: firstItem.itemID,
                        itemVarieties: firstItem.itemVarieties.map(
                            (variety) => variety.subVarietyID,
                        ),
                        items: itemsArray,
                    });
                }

                return finalGroup;
            },
            [],
        );

        setGroupedItems(mergedGroupedItems);
    }, [cartItems]);

    const handleBack = () => {
        navigation.navigate('Menu');
    };

    const handleClose = (item) => {
        const { itemID, itemVarieties } = item;
        dispatch(removeAll({ itemID: itemID, itemVarieties: itemVarieties }));
    };

    const findVarietyName = (varieties, subVarietyID) => {
        const variety = varieties.find(
            (variety) => variety.subVarietyID === subVarietyID,
        );
        return variety ? variety.subVarName : 'Unknown Variety';
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
            const item = items.items[0];
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
                            <TouchableOpacity onPress={() => handleClose(item)}>
                                <Icon.X
                                    width={17}
                                    height={17}
                                    stroke={'red'}
                                    strokeWidth={3}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.toppings}>
                            {item.itemVarieties
                                ? item.itemVarieties
                                      .map((variety) =>
                                          findVarietyName(
                                              item.itemVarieties,
                                              variety.subVarietyID,
                                          ),
                                      )
                                      .join(' , ')
                                : 'No Varieties'}
                        </Text>
                        <View style={styles.priceSection}>
                            <Text style={styles.priceMenu}>
                                Rp. {item.itemPrice}
                            </Text>
                            <View style={styles.counter}>
                                {order === items.items.length ? (
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
                                        onPress={() =>
                                            handleDecrease(items.items[0])
                                        }
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
                                    {items.items.length}
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
                {touched.tableNumber && errors.tableNumber && (
                    <Text style={styles.errorText}>{errors.tableNumber}</Text>
                )}
                <InputText
                    label={'Note'}
                    placeholder={'example: extra spicy'}
                    value={values.orderNote}
                />
            </View>
        );
    };

    const convertImage = (image) => {
        return `uri: 'data:image/png;base64,${image}'`;
    };

    const renderVoucher = () => {
        return (
            <View style={styles.dropdownContainer}>
                {/*<Image*/}
                {/*    source={{*/}
                {/*        uri: `data:image/png;base64,${vouchers[0].logoImage}`,*/}
                {/*    }}*/}
                {/*/>*/}
                <SelectCountry
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    imageStyle={styles.imageStyle}
                    data={vouchers}
                    imageField={convertImage('logoImage')}
                    labelField="promotionName"
                    valueField="voucherValue"
                    // onChange={handleDropdown}
                    maxHeight={300}
                    searchPlaceholder="Search..."
                    placeholder={'Select Voucher'}
                    value={sale}
                    onChange={(item) => {
                        setSale(item.voucherValue);
                        dispatch(setPiece(item.voucherValue));
                        setNameVoucher(item.label);
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
                        <Text
                            style={styles.textItem}
                        >{`(${cartItems.length} items)`}</Text>
                    </View>
                    <Text style={styles.textSubtotal}>
                        Rp.{' '}
                        {(sale ? cartTotal - sale : cartTotal) < 0
                            ? 0
                            : sale
                              ? cartTotal - sale
                              : cartTotal}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/*<Button title={'tt'} onPress={console.log(groupedItems)} />*/}
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
                        buttonStyle={{ backgroundColor: totalBalance }}
                        onPress={handleSubmit}
                        disabled={balanceUser <= 0}
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
    errorText: {
        color: 'red',
        marginTop: 5,
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
        height: 66,
        width: '70%',
        borderColor: theme.grey,
        borderWidth: 1,
        borderRadius: 66 / 2,
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
        width: 36,
        height: 36,
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
