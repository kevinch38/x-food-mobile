import { View, ScrollView, BackHandler, TouchableOpacity } from 'react-native';
import OrderHistoryCard from '../../components/card/OrderHistoryCard';
import { useSelector } from 'react-redux';
import UserService from '../../services/UserService';
import React, { useEffect, useState } from 'react';
import HistoryService from '../../services/HistoryService';
import { format } from 'date-fns';
import Loading from '../../components/loading';

const OrderScreen = () => {
    const phoneNumber = useSelector((state) => state.ui.phoneNumber);
    const userService = UserService();
    const historyService = HistoryService();
    const [isLoading, setIsLoading] = React.useState(false);
    const [id, setId] = useState('');
    const [order, setOrder] = useState([]);

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
            setOrder(historyOrder.data);
        } catch (error) {
            console.error('Error fetching user data2:', error);
        }
    };

    console.log(order);

    return (
        <View style={{ margin: 5 }}>
            <ScrollView>
                {order.map((orderItem, index) => (
                    <TouchableOpacity key={index}>
                        <OrderHistoryCard
                            image={orderItem.image}
                            items={orderItem.quantity}
                            title={orderItem.merchantName}
                            date={format(
                                new Date(orderItem.createdAt),
                                'dd MMM, HH:mm',
                            )}
                            status={orderItem.orderStatus}
                            orderValue={orderItem.orderValue}
                            isSplit={orderItem.isSplit}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default OrderScreen;
