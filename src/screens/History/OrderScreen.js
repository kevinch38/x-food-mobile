import {
    View,
    ScrollView,
    Pressable,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import OrderHistoryCard from '../../components/card/OrderHistoryCard';
import { useSelector } from 'react-redux';
import UserService from '../../services/UserService';
import React, { useEffect, useState } from 'react';
import HistoryService from '../../services/HistoryService';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { formatIDRCurrency } from '../../utils/utils';
import Color from '../../assets/Color';

const OrderScreen = () => {
    const phoneNumber = useSelector((state) => state.ui.phoneNumber);
    const userService = UserService();
    const historyService = HistoryService();
    const [id, setId] = useState('');
    const [order, setOrder] = useState([]);
    const [status, setStatus] = useState({});
    const navigation = useNavigation();
    const { isLoading } = useSelector((state) => state.ui);

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([
                fetchUserData(phoneNumber),
                getAllOrderHistories(),
            ]);
        };

        fetchData();
    }, [phoneNumber, id]);

    const fetchUserData = async (phoneNumber) => {
        try {
            const userData =
                await userService.fetchUserByPhoneNumber(phoneNumber);
            const accountID = userData.data.accountID;
            setId(accountID);
        } catch (error) {
            console.error('Error fetching user data1:', error);
        }
    };

    const getAllOrderHistories = async () => {
        try {
            const historyOrder =
                await historyService.getAllOrderByAccountId(id);
            const sortedOrder = historyOrder.data.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
            );
            setOrder(sortedOrder);
        } catch (error) {
            console.error('Error fetching user data2:', error);
        }
    };

    const getAllOrderHistoriesWithStatus = async () => {
        order.forEach((or) => {
            let status = '';
            if (or.orderStatus === 'WAITING_FOR_PAYMENT') {
                status = 'Waiting for payment';
            } else if (or.orderStatus === 'DONE') {
                status = 'Order Done';
            } else if (or.orderStatus === 'REJECTED') {
                status = 'Order Rejected';
            } else {
                status = 'Order Failed';
            }

            setStatus((prevState) => ({
                ...prevState,
                [or.orderID]: status,
            }));
        });
    };

    useEffect(() => {
        getAllOrderHistoriesWithStatus();
    }, [order]);

    return (
        <View style={{ margin: 5 }}>
            {isLoading ? (
                <View style={styles.loading}>
                    <ActivityIndicator color={Color.primary} size={'large'} />
                </View>
            ) : (
                <ScrollView
                    style={{ marginBottom: 250 }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    {order.map((orderItem, index) => (
                        <Pressable
                            key={index}
                            onPress={() => {
                                navigation.navigate('EReceipt', {
                                    orderID: orderItem.orderID,
                                    image: orderItem.image,
                                    date: format(
                                        new Date(orderItem.createdAt),
                                        'dd MMM, HH:mm',
                                    ),
                                    total: orderItem.orderValue,
                                    orderItems: orderItem.orderItems,
                                    isSplit: orderItem.isSplit,
                                });
                            }}
                            disabled={
                                orderItem.orderStatus ===
                                    'WAITING_FOR_PAYMENT' ||
                                orderItem.orderStatus === 'REJECTED'
                            }
                        >
                            <OrderHistoryCard
                                image={orderItem.image}
                                items={orderItem.quantity}
                                title={orderItem.merchantName}
                                date={format(
                                    new Date(orderItem.createdAt),
                                    'dd MMM, HH:mm',
                                )}
                                status={status[orderItem.orderID]}
                                orderValue={formatIDRCurrency(
                                    orderItem.orderValue,
                                )}
                                isSplit={orderItem.isSplit}
                            />
                        </Pressable>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    loading: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
});
export default OrderScreen;
