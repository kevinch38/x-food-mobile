import {ScrollView, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import HistoryCard from "../../components/HistoryCard";
import image from '../../assets/images/topupimage.png'
import HistoryService from "../../services/HistoryService";
import UserService from "../../services/UserService";
import {useSelector} from "react-redux";
import {format} from "date-fns";
import {formatIDRCurrency} from "../../utils/utils";
import {useNavigation} from "@react-navigation/native";

const TopUpScreen = () => {
    const phoneNumber = useSelector((state) => state.ui.phoneNumber);
    const historyService = HistoryService();
    const [id, setId] = useState('');
    const userService = UserService();
    const [topUp, setTopUp] = useState([]);
    const navigation = useNavigation();
    const handleCartPress = (amount) => {
        navigation.navigate("TopUpDetail", {amount})
    }
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

    const getAllTopUpHistories = async () => {
        try {
            const historyTopUp = await historyService.getAllTopUpHistoryByAccountId(id);
            const sortedTopUp = historyTopUp.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setTopUp(sortedTopUp);
        } catch (error) {
            console.error('Error fetching user data2:', error);
        }
    };

    useEffect(() => {
        fetchUserData(phoneNumber);
    }, [phoneNumber]);

    useEffect(() => {
        if (id !== '') {
            getAllTopUpHistories();
        }
    }, [id]);
    return(
       <View>
           <ScrollView
               showsHorizontalScrollIndicator={false}
               showsVerticalScrollIndicator={false}
           >
               {topUp.map((tu, index)=>(
                   <TouchableOpacity
                    key={index}
                    onPress={()=>handleCartPress(tu.topUpAmount)}
                   >
                       <HistoryCard key={index} image={image} date={format(new Date(tu.createdAt), "dd MMM, HH:mm")} title={`Top Up`} content={`Top Up Success`} amount={formatIDRCurrency(tu.topUpAmount)}/>
                   </TouchableOpacity>
               ))}
           </ScrollView>
       </View>
    )
}

export default TopUpScreen;
