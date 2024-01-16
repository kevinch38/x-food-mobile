import {Image, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import PaymentReceipt from "../../components/paymentReceipt";
import HistoryCard from "../../components/HistoryCard";
import {format} from "date-fns";
import {useSelector} from "react-redux";
import UserService from "../../services/UserService";
import HistoryService from "../../services/HistoryService";
import Account from "../../components/account";
import { render } from "@testing-library/react-native";
import BackButton from "../../components/backButton";


function Notification() {
    const phoneNumber = useSelector((state) => state.ui.phoneNumber);
    const users = useSelector(state => state.user.users)
    const userService = UserService();
    const historyService = HistoryService();
    const [id, setId] = useState("");
    const [payments, setPayments] = useState([]);
    const [paymentData, setPaymentData] = useState({})
    const [paymentTitle, setPaymentTitle] = useState({});
    const [paymentContet, setPaymentContent] = useState({});
    const [paymentTitleButton, setPaymentTitleButton] = useState({});
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
            // console.log("=========================>",historyPayment.data);

        } catch (error) {
            console.error('Error fetching user data2:', error);
        }
    };


    const getAllHistoriesWithStatus = async () => {
        // console.log("+++++++++++++++++++++++++>",payments);
        payments.forEach((payment) => {
            let status ='';
            let title = "";
            let content = "";
            if (payment.paymentType === "ORDER" && payment.paymentStatus === "PENDING") {
                content = "Requested";
            }
            else if (payment.paymentType === "ORDER" && payment.paymentStatus === "SUCCESS"){
                content = "Received";
            }
            else if (payment.paymentType === "ORDER" && payment.paymentStatus === "FAILED"){
                content = "Failed"
            }
            else if (payment.paymentType === "ORDER" && payment.paymentStatus === "EXPIRED"){
                content = "Expired";
            }
            else if (
                payment.paymentType === 'FRIEND' &&
                payment.paymentStatus === 'PENDING' &&
                payment.accountID !== users.accountID
            ) {
                content = 'Request Payment';
                title = 'You Receive A Split Bill From';
                titleButton = 'Pay';
            } else if (
                payment.paymentType === 'FRIEND' &&
                payment.paymentStatus === 'PENDING' &&
                payment.accountID === users.accountID
            ) {
                content = 'Incoming Request Payment';
                titleButton = 'Done'
            } else if (
                payment.paymentType === 'FRIEND' &&
                payment.paymentStatus === 'SUCCESS' &&
                payment.accountID !== users.accountID
            ) {
                content = 'Money Sent';
                title = 'Money Sent'
                titleButton = 'Done';

            } else if (
                payment.paymentType === 'FRIEND' &&
                payment.paymentStatus === 'SUCCESS' &&
                payment.accountID === users.accountID
            ) {
                content = 'Money Recieved';
                title = 'Your Received A Payment from';
                titleButton = 'Done'

            } else if (
                payment.paymentType === 'FRIEND' &&
                payment.paymentStatus === 'FAILED'
            ) {
                content = 'Payment Failed';
            } else if (
                payment.paymentType === 'FRIEND' &&
                payment.paymentStatus === 'EXPIRED'
            ) {
                content = 'Payment Expired';
            } else {
                status = 'Failed';
            }

            setPaymentTitle(prevTitle => ({
                ...prevTitle,
                [payment.paymentID]: title,
            }));

            setPaymentContent(prevContent => ({
                ...prevContent,
                [payment.paymentID]: content,
            }));

             setPaymentTitleButton((prevTitleButton) => ({
                 ...prevTitleButton,
                 [payment.paymentID]: titleButton,
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

    const handleToPin = (paymentID) => {
        navigation.navigate('Pin', {
            destination: 'CompletePaymentSpiltBill',
            paymentID: paymentID,
        });
    } 

    const renderDetailNotification = () => {
        return (
            <View>
                <PaymentReceipt
                    title={paymentTitle[paymentData.paymentID]}
                    // display={paymentDisplay[paymentData.paymentID]}
                    name={
                        paymentData.accountID === users.accountID
                            ? paymentData.friend.accountFirstName2
                            : paymentData.friend.accountFirstName1
                    }
                    image={
                        paymentData.accountID === users.accountID
                            ? paymentData.friend.imageAccount2
                            : paymentData.friend.imageAccount1
                    }
                    totalAmount={paymentData.paymentAmount}
                    titleButton={paymentTitleButton[paymentData.paymentID]}
                    onPress={
                        paymentTitleButton[paymentData.paymentID] === 'Pay'
                            ? () =>  handleToPin(paymentData.paymentID)
                            : () => handleButtonPress('button2')
                    }
                />
            </View>
        );
    }

    const renderListNotification = () => {
        return (
            <View >
                <ScrollView  style={{height:'min-content'}}>
                    {payments.map((payment, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleButtonPress('button1', payment)}
                        >
                            <HistoryCard
                                date={format(
                                    new Date(payment.createdAt),
                                    'dd MMM, HH:mm',
                                )}
                                title={
                                    payment.accountID === users.accountID
                                        ? payment.friend.accountFirstName2
                                        : payment.friend.accountFirstName1
                                }
                                content={paymentContet[payment.paymentID]}
                                image={
                                    payment.accountID === users.accountID
                                        ? payment.friend.imageAccount2
                                        : payment.friend.imageAccount1
                                }
                            />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        );

    }

    const [activeButton, setActiveButton] = useState('button2');

    const handleButtonPress = (buttonName, payment) => {
        setActiveButton(buttonName);
        setPaymentData(payment)
    };


    const renderHeader = () => {
        return (
            <View
                style={{
                    width: '100%',
                    height: '10%',
                    justifyContent: 'center',
                }}
            >
                <BackButton onPress={() => handleButtonPress('button2')} />
                <View
                    style={{
                        flexDirection: 'row',
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ fontWeight: '500', fontSize: 18 }}>
                        Notification
                    </Text>
                </View>
                <Account image={users.profilePhoto} />
            </View>
        );
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
        <View style={styles.wrapper}>
            {renderHeader()}
            {selectedComponent}
        </View>
    )

}


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#fff',
    },
   
});

export default Notification;
