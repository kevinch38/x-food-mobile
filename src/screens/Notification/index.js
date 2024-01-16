import {Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import PaymentReceipt from "../../components/paymentReceipt";
import HistoryCard from "../../components/HistoryCard";
import {format} from "date-fns";
import {useSelector} from "react-redux";
import UserService from "../../services/UserService";
import HistoryService from "../../services/HistoryService";


function Notification() {
    const phoneNumber = useSelector((state) => state.ui.phoneNumber);
    const userService = UserService();
    const historyService = HistoryService();
    const [id, setId] = useState("");
    const [payments, setPayments] = useState([]);
    const [paymentStatus, setPaymentStatus] = useState({});
    const [paymentContet, setPaymentContent] = useState({});
    const navigation = useNavigation();
    const [imageButtonClicked, setImageButtonClicked] = useState(false);



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

    const getAllOrderHistories = async () => {
        try {
            const historyPayment = await historyService.getAllPaymentHistoryByAccountId(id);
            setPayments(historyPayment.data);
            console.log("=========================>",historyPayment.data);

        } catch (error) {
            console.error('Error fetching user data2:', error);
        }
    };


    const getAllHistoriesWithStatus = async () => {
        console.log("+++++++++++++++++++++++++>",payments);
        payments.forEach((payment) => {
            let status = "";
            let content = "";
            if (payment.paymentType === "ORDER" && payment.paymentStatus === "PENDING") {
                status = "Request Sent";
                content = "Requested";
            }
            else if (payment.paymentType === "ORDER" && payment.paymentStatus === "SUCCESS"){
                status = "Payment Received";
                content = "Received";
            }
            else if (payment.paymentType === "ORDER" && payment.paymentStatus === "FAILED"){
                status = "Request Failed";
                content = "Failed"
            }
            else if (payment.paymentType === "ORDER" && payment.paymentStatus === "EXPIRED"){
                status = "Request Expired";
                content = "Expired";
            }
            else if (payment.paymentType === "FRIEND" && payment.paymentStatus === "PENDING"){
                status = "Your Friend Requested";
                content = "Pay Request";
            }
            else if (payment.paymentType === "FRIEND" && payment.paymentStatus === "SUCCESS"){
                status = "Payment Sent";
                content = "Payment Success";
            }
            else if (payment.paymentType === "FRIEND" && payment.paymentStatus === "FAILED") {
                status = "Payment Failed";
                content = "Payment Failed";
            }
            else if (payment.paymentType === "FRIEND" && payment.paymentStatus === "EXPIRED") {
                status = "Payment Expired";
                content = "Payment Expired";
            }
            else{
                status = "Failed";

            }

            setPaymentStatus(prevStatus => ({
                ...prevStatus,
                [payment.paymentID]: status,
            }));

            setPaymentContent(prevContent => ({
                ...prevContent,
                [payment.paymentID]: content,
            }));


        });

    }

    useEffect(() => {
        fetchUserData(phoneNumber)
    }, [phoneNumber]);

    useEffect(() => {
        if (id !== "") {
            getAllOrderHistories()
        }
    }, [id]);

    useEffect(() => {
        if (id !== ""){
            getAllHistoriesWithStatus()
        }
    }, [id, payments]);

    const renderDetailNotification = () => {
        return (
            <View style={{margin:10}}>
                <PaymentReceipt/>
            </View>
        )
    }

    const renderListNotification = () => {
        return (
            <View style={{margin:60}}>
                <ScrollView>
                    {payments.map((payment, index) => (
                        <Pressable  key={index}
                                    onPress={() => handleButtonPress('button1')}
                        >
                            <HistoryCard
                                date={format(new Date(payment.createdAt), "dd MMM, HH:mm")}
                                title={paymentStatus[payment.paymentID]}
                                content={paymentContet[payment.paymentID]}
                                amount={payment.paymentAmount}
                            />
                        </Pressable>

                    ))}
                </ScrollView>
            </View>

        )

    }

    const [activeButton, setActiveButton] = useState('button1');

    const handleButtonPress = (buttonName) => {
        setActiveButton(buttonName);
    };


    let selectedComponent;

    switch (activeButton) {
        case 'button1':
            selectedComponent = renderDetailNotification();
            break;
        case 'button2':
            selectedComponent = renderListNotification();
            break;
        default:
            selectedComponent = renderListNotification();
            break;
    }

    return(
        <View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginBottom: -60,
                    marginTop:20
                }}
            >
                <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('button2')}>
                    <Image source={require('../../../assets/images/button.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 16 }}>
                        Notification
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Image source={require('../../assets/images/userimage.png')} />
                </TouchableOpacity>
            </View>
                {selectedComponent}
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 12,
    },
    button: {
        flex: 1,
        padding: 5,
        margin: 20,
        borderRadius: 30,
        marginTop:20
    },

    font: {
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
        fontSize: 16,
    },

    buttonImage: {
        position: 'absolute',
        top: 20,
    },
});

export default Notification;