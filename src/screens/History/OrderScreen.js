import {View, ScrollView, BackHandler, TouchableOpacity} from "react-native";
import OrderHistoryCard from "../../components/card/OrderHistoryCard";
import {useSelector} from "react-redux";
import UserService from "../../services/UserService";
import React, {useEffect, useState} from "react";
import HistoryService from "../../services/HistoryService";
import { format } from 'date-fns';


const OrderScreen = () => {
    const phoneNumber = useSelector((state) => state.ui.phoneNumber);
    const userService = UserService();
    const historyService = HistoryService();
    const [isLoading, setIsLoading] = React.useState(false);
    const [id, setId] = useState("");
    const [order, setOrder] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await Promise.all([fetchUserData(phoneNumber), getAllOrderHistories()]);
            setIsLoading(false);
        };

        fetchData();

    }, [phoneNumber, id]);

    const fetchUserData = async (phoneNumber) => {
        try {
            const userData = await userService.fetchUserByPhoneNumber(phoneNumber);
            console.log('userData:', userData.data.accountID);
            const accountID = userData.data.accountID;
            setId(accountID);

        } catch (error) {
            console.error('Error fetching user data1:', error);
        }
    };

    const getAllOrderHistories = async () => {
        try {
            const historyOrder = await historyService.getAllOrderByAccountId(id);
            console.log("History :", historyOrder);
            setOrder(historyOrder.data);
            console.log("data =====>", order);

        } catch (error) {
            console.error('Error fetching user data2:', error);
        }
    }


    return (
      <View style={{margin:5}}>
            <ScrollView>
                {order.map((orderItem, index) => (
                    // key={index}
                    <TouchableOpacity  key={index}>
                        <OrderHistoryCard
                            image={orderItem.image}
                            items={orderItem.items}
                            title={orderItem.merchantName}
                            date={format(new Date(orderItem.createdAt), "dd MMM, HH:mm")}
                            status={orderItem.orderStatus}
                            orderValue={orderItem.orderValue}
                        />
                    </TouchableOpacity>

                ))}
            </ScrollView>
      </View>
    )
}

export default OrderScreen;