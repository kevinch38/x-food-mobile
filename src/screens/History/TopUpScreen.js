import {ScrollView, View} from "react-native";
import React, {useEffect, useState} from "react";
import HistoryCard from "../../components/HistoryCard";
import image from '../../assets/images/topupimage.png'
import HistoryService from "../../services/HistoryService";
import UserService from "../../services/UserService";
import {useSelector} from "react-redux";
import {format} from "date-fns";

const TopUpScreen = () => {
    const phoneNumber = useSelector((state) => state.ui.phoneNumber);
    const historyService = HistoryService();
    const [id, setId] = useState("");
    const userService = UserService();
    const [topUp, setTopUp] = useState([]);
    const fetchUserData = async (phoneNumber) => {
        try {
            const userData = await userService.fetchUserByPhoneNumber(phoneNumber);
            const accountID = userData.data.accountID;
            setId(accountID);
            console.log(id);

        } catch (error) {
            console.error('Error fetching user data1:', error);
        }
    };

    const getAllTopUpHistories = async () => {
        try {
            const historyTopUp = await historyService.getAllTopUpHistoryByAccountId(id);
            setTopUp(historyTopUp.data);
        } catch (error) {
            console.error('Error fetching user data2:', error);
        }
    };


    useEffect(() => {
        fetchUserData(phoneNumber)
    }, [phoneNumber]);

    useEffect(() => {
        if (id !== "") {
            getAllTopUpHistories()
        }
    }, [id]);
    return(
       <View style={{margin:20}}>
           <ScrollView>
               {topUp.map((tu, index)=>(
                   <HistoryCard key={index} image={image} date={format(new Date(tu.createdAt), "dd MMM, HH:mm")} title={`Top Up`} content={`Top Up Success`} amount={tu.topUpAmount}/>
               ))}
           </ScrollView>
       </View>
    )
}

export default TopUpScreen