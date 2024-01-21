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
    selectCartTotal,
    setPiece,
} from '../../slices/cartSlice';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { userAction } from '../../slices/userSlice';
import { ServiceContext } from '../../context/ServiceContext';
import { createOrderAction } from '../../slices/orderSlice';
import { fetchBalanceAction } from '../../slices/balanceSlice';
import Color from '../../assets/Color';
import ErrorText from '../../components/errorText';
import VoucherService from '../../services/VoucherService';
import { formatIDRCurrency } from '../../utils/utils';
import Logo from '../../assets/images/mechant-logo.png';

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
    const voucherService = VoucherService();
    const [vouchers, setVouchers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [balanceUser, setBalanceUser] = useState(0);
    const phoneNumber = useSelector((state) => state.ui.phoneNumber);
    const { selectedMerchant } = useSelector((state) => state.merchant);
    const [voucherID, setVoucherID] = useState('');

    const filteredVouchers = vouchers.filter((voucher) => {
        return voucher.merchantID === selectedMerchant.merchantID;
    });

    const validationButton =
        balanceUser <= 0 ||
        cartItems.length === 0 ||
        isValid ||
        dirty ||
        balanceUser < cartTotal
            ? Color.disabled
            : Color.primary;

    useEffect(() => {
        setVouchers(users?.vouchers);
    }, [users]);

    useEffect(() => {
        setBalanceUser(balance.totalBalance);
    }, [balance.totalBalance]);

    useEffect(() => {
        const groupedCartItems = groupCartItems(cartItems);

        setGroupedItems(groupedCartItems);
    }, [cartItems]);

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
                            users.balance.balanceID,
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

    const groupCartItems = (cartItems) => {
        const groupedItems = cartItems.reduce((group, item) => {
            const key = item.mergeID;
            if (!group[key]) {
                group[key] = [];
            }
            group[key].push(item);
            return group;
        }, {});
        const groupsWithMergeId = Object.entries(groupedItems).map(
            ([mergeId, items]) => ({
                mergeId,
                items,
            }),
        );

        return groupsWithMergeId;
    };

    const Schema = yup.object().shape({
        tableNumber: yup
            .number()
            .required('Table Number is required')
            .integer('Table Number must be an integer')
            .positive('Table Number must be a positive number'),
        orderNote: yup.string().matches(/^[a-zA-Z0-9. ]*$/, 'Invalid Notes'),
    });

    const {
        values: { tableNumber, orderNote },
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
                                const key = item.mergeID;
                                if (!grouped[key]) {
                                    grouped[key] = {
                                        itemID: item.itemID,
                                        quantity: 0,
                                        subVarieties: new Set(),
                                    };
                                }

                                item.itemVarieties.forEach((variety) => {
                                    grouped[key].subVarieties.add(
                                        variety.subVarietyID,
                                    );
                                });

                                grouped[key].quantity += 1;
                                return grouped;
                            },
                            {},
                        );

                        const result = Object.values(groupedOrderItem).map(
                            (item) => ({
                                itemID: item.itemID,
                                quantity: item.quantity,
                                subVarieties: Array.from(item.subVarieties),
                            }),
                        );

                        const orderItems = {
                            accountID: users.accountID,
                            orderValue: cartTotal - sale,
                            notes: orderNote,
                            tableNumber: tableNumber,
                            branchID: selectedBranch.branchID,
                            orderItems: result,
                        };

                        navigation.navigate('Pin', {
                            destination: 'Payment',
                            orderItems: orderItems,
                            voucherID: voucherID,
                        });
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
        dispatch(removeFromCart(item));
    };

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
        return Object.entries(groupedItems).map(([mergeID, group]) => {
            const item = group.items[0];
            return (
                <View style={styles.sectionContainer} key={mergeID}>
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
                            {item.itemVarieties.length !== 0
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
                                Rp. {item.itemPrice.toLocaleString()}
                            </Text>
                            <View style={styles.counter}>
                                {order === group.items.length ? (
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
                                    {group.items.length}
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
                    onChangeText={handleChange('tableNumber')}
                    value={tableNumber}
                />
                {touched.tableNumber && errors.tableNumber && (
                    <ErrorText message={errors.tableNumber} />
                )}
                <InputText
                    label={'Note'}
                    placeholder={'example: extra spicy'}
                    onChangeText={handleChange('orderNote')}
                    value={orderNote}
                />
                {touched.orderNote && errors.orderNote && (
                    <ErrorText message={errors.orderNote} />
                )}
            </View>
        );
    };

    const convertImage = (image) => {
        return `uri: 'data:image/png;base64,${image}'`;
    };

    const renderVoucher = () => {
        return (
            <View style={styles.dropdownContainer}>
                <SelectCountry
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    imageStyle={styles.imageStyle}
                    data={filteredVouchers}
                    imageField={convertImage('logoImage')}
                    labelField="promotionName"
                    valueField="voucherValue"
                    maxHeight={300}
                    searchPlaceholder="Search..."
                    placeholder={'Select Voucher'}
                    value={sale}
                    onChange={(item) => {
                        setSale(item.voucherValue);
                        dispatch(setPiece(item.voucherValue));
                        setNameVoucher(item.label);
                        setVoucherID(item.voucherID);
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
                    <Text style={styles.textSubtotal}>
                        Rp. {cartTotal.toLocaleString()}
                    </Text>
                </View>
                {sale ? (
                    <View style={styles.subtotalStyle}>
                        <Text style={styles.textSubtotal}>Voucher</Text>
                        <Text style={styles.textSale}>
                            Rp.- {sale.toLocaleString()}
                        </Text>
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
                        {(sale ? cartTotal - sale : cartTotal) < 0
                            ? 0
                            : sale
                              ? formatIDRCurrency(cartTotal - sale)
                              : formatIDRCurrency(cartTotal)}
                    </Text>
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
                    {renderInformation()}
                    {renderVoucher()}
                    {renderSubTotal()}
                </View>
                <View style={styles.buttonCheckout}>
                    <Button
                        title={'CHECKOUT'}
                        titleStyle={styles.titleStyle}
                        buttonStyle={{ backgroundColor: validationButton }}
                        onPress={() => {
                            setFieldValue(voucherID);
                            handleSubmit();
                        }}
                        disabled={
                            balanceUser <= 0 ||
                            cartItems.length === 0 ||
                            !isValid ||
                            !dirty ||
                            balanceUser < cartTotal
                        }
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
