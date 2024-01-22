import {
    BackHandler,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';
import { theme } from '../../theme';
import { useSelector } from 'react-redux';
import Button from '../../components/button';
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import OrderService from '../../services/OrderService';
import { formatIDRCurrency } from '../../utils/utils';
import Loading from '../../components/loading';

function EReceipt({ navigation }) {
    const orderService = OrderService();
    const route = useRoute();
    const orderId = route.params.orderID;
    const [order, setOrder] = useState();
    const sale = useSelector((state) => state.cart.sale);
    const [discounts, setDiscounts] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { users } = useSelector((state) => state.user);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => true,
        );
        return () => backHandler.remove();
    }, [order]);

    useEffect(() => {
        fetchOrderByID();
    }, []);

    useEffect(() => {
        if (order && (sale !== 0 || sale !== null || sale !== '')) {
            getDiscount();
            getDiscountValue();
        }
    }, [order, sale]);

    const fetchOrderByID = async () => {
        try {
            setIsLoading(true);
            const getOrder = await orderService.getOrderById(orderId);
            setOrder(getOrder);
        } catch (error) {
            console.error('Error fetching user data1:', error);
        } finally {
            setIsLoading(false);
        }
    };
    const dataOrder = order?.data;
    const getDiscount = () => {
        let countDiscount = Math.ceil(1 - sale / dataOrder?.orderValue);
        dataOrder?.orderItems.forEach((o) => {
            setDiscounts((prevState) => ({
                ...prevState,
                [o.itemName]: countDiscount * o?.price,
            }));
        });
    };

    const getDiscountValue = () => {
        let initialValue = 0;
        dataOrder?.orderItems.map((o) => {
            initialValue += o?.price;
        });

        let orderValue = dataOrder?.orderValue;
        return orderValue - initialValue;
    };

    const orderItemsAssign = Object.values(
        (dataOrder?.orderItems || []).reduce((groupedItems, order) => {
            const key = order?.itemName;

            if (!groupedItems[key]) {
                groupedItems[key] = {
                    orderItemID: order?.orderItemID,
                    orderID: order?.orderID,
                    itemName: order?.itemName,
                    price: discounts[order?.itemName],
                    orderItemSubVarieties: [],
                    createdAt: order?.createdAt,
                    updatedAt: order?.updatedAt,
                    quantity: 1,
                };
            } else {
                groupedItems[key].quantity += 1;
            }

            return groupedItems;
        }, {}),
    );

    const dataAssigned = {
        orderID: dataOrder?.orderID,
        accountID: dataOrder?.accountID,
        paymentAmount: dataOrder?.orderValue,
        orderStatus: dataOrder?.orderStatus,
        branchID: dataOrder?.branchID,
        merchantName: dataOrder?.merchantName,
        image: dataOrder?.image,
        isSplit: dataOrder?.isSplit,
        pointAmount: dataOrder?.pointAmount,
        orderItems: orderItemsAssign.map((item) => ({
            ...item,
            quantity: item.quantity,
            itemPrice: item.price,
            newPrice: item.quantity * item.price,
        })),
        createdAt: dataOrder?.createdAt,
        updatedAt: dataOrder?.updatedAt,
    };

    const handleToHome = () => {
        navigation.navigate('Tabs');
    };

    const renderHeader = () => {
        return (
            <View style={styles.imageController}>
                <Image
                    style={styles.imageHeader}
                    source={{
                        uri: `data:image/jpeg;base64,${dataOrder?.image}`,
                    }}
                />
                <Text style={styles.title}>
                    Order Confirmed, Your Food is On The Way :)
                </Text>
                <Text style={styles.subTitle}>
                    Your order has been successfully placed and has been
                    processed.
                </Text>
            </View>
        );
    };

    const renderContent = () => {
        return (
            <View style={{ alignItems: 'center', height: '60%', width: '90%' }}>
                <View style={styles.struckContainer}>
                    <View
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: -10,
                            height: 20,
                            width: 20,
                            backgroundColor: '#EC9D3F',
                            borderRadius: 100 / 2,
                        }}
                    />
                    <View
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: -10,
                            height: 20,
                            width: 20,
                            backgroundColor: '#EC9D3F',
                            borderRadius: 100 / 2,
                        }}
                    />
                    <View style={{ marginLeft: '5%' }}>
                        <Text
                            style={{
                                marginTop: '5%',
                                fontWeight: 'bold',
                                fontSize: 16,
                            }}
                        >
                            Order ID {dataAssigned?.orderID}
                        </Text>
                        <Text
                            style={{
                                marginTop: '3%',
                                fontSize: 14,
                            }}
                        >
                            {dataAssigned?.date}
                        </Text>
                    </View>
                    <View
                        style={{
                            zIndex: 9999,
                            marginTop: '7%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            style={{ width: 130, height: 130 }}
                            source={{
                                uri: `data:image/jpeg;base64,${dataAssigned?.image}`,
                            }}
                        />
                        <Text
                            style={{
                                fontWeight: '700',
                                fontSize: 20,
                                marginTop: '5%',
                            }}
                        >
                            Order Completed
                        </Text>
                        <View style={{height:"30%"}}>
                            <ScrollView
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                            >
                                {dataAssigned?.orderItems.map((order, index) => (
                                    <View key={index} style={{ width: '100%', marginTop: '5%' }}>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-evenly',
                                                flexWrap: 'wrap'
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 16,
                                                    fontWeight: 400,
                                                }}
                                            >
                                                {order.itemName}
                                            </Text>
                                            <Text style={{ fontSize: 14, fontWeight: 400, marginLeft: 10 }}>
                                                x{order.quantity}
                                            </Text>
                                            <Text style={{ fontWeight: '700', fontSize: 16, marginLeft: 10 }}>
                                                {formatIDRCurrency(order.newPrice)}
                                            </Text>
                                        </View>
                                        <View style={{ marginLeft: '9%' }}>
                                            {order.orderItemSubVarieties
                                                .length > 0 && (
                                                <Text
                                                    style={{
                                                        fontSize: 14,
                                                        fontWeight: 400,
                                                        marginTop: 10,
                                                    }}
                                                >
                                                    [
                                                    {order.orderItemSubVarieties
                                                        .map(
                                                            (or) =>
                                                                or.subVariety
                                                                    .subVarName,
                                                        )
                                                        .join(', ')}
                                                    ]
                                                </Text>
                                            )}
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>

                        </View>
                        {/*<Text>{dataOrder?.orderValue - }</Text>*/}
                        {getDiscountValue() === 0 ? (
                            ``
                        ) : (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-evenly',
                                    marginTop: '5%',
                                }}
                            >
                                <Text>Discount</Text>
                                <Text
                                    style={{
                                        marginLeft: 100,
                                        fontWeight: '700',
                                        fontSize: 16,
                                        color: '#F94D63',
                                    }}
                                >
                                    {formatIDRCurrency(getDiscountValue())}
                                </Text>
                            </View>
                        )}

                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: 13,
                                marginLeft: '40%',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: 700,
                                    marginRight: 10,
                                }}
                            >
                                Total
                            </Text>
                            <Text style={{ fontSize: 16, fontWeight: 700 }}>
                                {formatIDRCurrency(dataOrder?.orderValue)}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    const renderFooter = () => {
        return (
            <View
                style={{
                    width: '100%',
                    position: 'absolute',
                    top: 650,
                    bottom: '10%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {route.params.isSplit ? (
                    ``
                ) : (
                    <Button
                        onPress={() =>
                            navigation.navigate('SplitBill', { dataAssigned })
                        }
                        buttonStyle={{
                            width: '80%',
                            borderRadius: 20,
                            marginBottom: 15,
                            backgroundColor: '#029094',
                        }}
                        title={'Split Bill'}
                        titleStyle={{ fontWeight: 'bold', fontSize: 16 }}
                    />
                )}

                <Button
                    onPress={handleToHome}
                    buttonStyle={{
                        width: '80%',
                        borderRadius: 20,
                        backgroundColor: '#34A853',
                    }}
                    title={'Done'}
                    titleStyle={{ fontWeight: 'bold', fontSize: 16 }}
                />
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.controller}>
            {isLoading ? (
                <Loading />
            ) : (
                <View style={{ height: '100%', alignItems: 'center' }}>
                    {renderContent()}
                    {renderFooter()}
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    controller: {
        flex: 1,
        backgroundColor: '#EC9D3F',
    },
    imageController: {
        marginTop: '10%',
        alignItems: 'center',
    },
    imageHeader: {
        width: 150,
        height: 150,
        marginTop: 46,
        marginBottom: 44,
    },
    title: {
        width: '80%',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    subTitle: {
        width: '60%',
        textAlign: 'center',
        marginTop: '5%',
        fontWeight: '300',
        fontSize: 13,
    },
    points: {
        width: '60%',
        textAlign: 'center',
        marginTop: '10%',
        fontWeight: '300',
        fontSize: 15,
    },
    inputPin: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    textInputStyle: {
        width: 54,
        height: 54,
        borderColor: theme.grey,
        borderWidth: 1,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 27,
        fontWeight: '500',
        color: theme.primary,
        marginTop: 62,
    },
    buttonForgotPin: {
        marginTop: 20,
        marginLeft: 31,
    },
    textForgotPin: {
        color: theme.primary,
        fontSize: 16,
        fontWeight: '600',
    },

    struckContainer: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 55,
        paddingHorizontal: 20,
        paddingVertical: 24,
        borderRadius: 20,
        height: 500,
    },
});
export default EReceipt;
