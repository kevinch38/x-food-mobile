import {View, ScrollView, TouchableOpacity} from "react-native";
import HistoryCard from "../../components/HistoryCard";
import React, {useEffect, useState} from "react";
import UserService from "../../services/UserService";
import HistoryService from "../../services/HistoryService";
import {useSelector} from "react-redux";
import {format} from "date-fns";
import {formatIDRCurrency} from "../../utils/utils";

const PaymentScreen = () => {
    const phoneNumber = useSelector((state) => state.ui.phoneNumber);
    const users = useSelector((state) => state.user.users);
    const userService = UserService();
    const historyService = HistoryService();
    const [id, setId] = useState('');
    const [payments, setPayments] = useState([]);
    const [paymentStatus, setPaymentStatus] = useState({});
    const [paymentContet, setPaymentContent] = useState({});

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
            const historyPayment =
                await historyService.getAllPaymentHistoryByAccountId(id);
            const sortedPayment = historyPayment.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setPayments(sortedPayment);
        } catch (error) {
            console.error('Error fetching user data2:', error);
        }
    };

    const getAllHistoriesWithStatus = async () => {
        payments.forEach((payment) => {
            let status = '';
            let content = '';
            if (
                payment.paymentType === 'ORDER' &&
                payment.paymentStatus === 'PENDING'
            ) {
                status = 'Request Sent';
                content = 'Requested';
            } else if (
                payment.paymentType === 'ORDER' &&
                payment.paymentStatus === 'SUCCESS'
            ) {
                status = 'Payment Received';
                content = 'Received';
            } else if (
                payment.paymentType === 'ORDER' &&
                payment.paymentStatus === 'FAILED'
            ) {
                status = 'Request Failed';
                content = 'Failed';
            } else if (
                payment.paymentType === 'ORDER' &&
                payment.paymentStatus === 'EXPIRED'
            ) {
                status = 'Request Expired';
                content = 'Expired';
            } else if (
                payment.paymentType === 'FRIEND' &&
                payment.paymentStatus === 'PENDING'
            ) {
                status = 'Your Friend Requested';
                content = 'Pay Request';
            } else if (
                payment.paymentType === 'FRIEND' &&
                payment.paymentStatus === 'SUCCESS'
            ) {
                status = 'Payment Sent';
                content = 'Payment Success';
            } else if (
                payment.paymentType === 'FRIEND' &&
                payment.paymentStatus === 'FAILED'
            ) {
                status = 'Payment Failed';
                content = 'Payment Failed';
            } else if (
                payment.paymentType === 'FRIEND' &&
                payment.paymentStatus === 'EXPIRED'
            ) {
                status = 'Payment Expired';
                content = 'Payment Expired';
            } else {
                status = 'Failed';
            }

            setPaymentStatus((prevStatus) => ({
                ...prevStatus,
                [payment.paymentID]: status,
            }));

            setPaymentContent((prevContent) => ({
                ...prevContent,
                [payment.paymentID]: content,
            }));
        });
    };

    useEffect(() => {
        fetchUserData(phoneNumber);
    }, [phoneNumber]);

    useEffect(() => {
        if (id !== '') {
            getAllOrderHistories();
        }
    }, [id]);

    useEffect(() => {
        if (id !== '') {
            getAllHistoriesWithStatus();
        }
    }, [id, payments]);

    return (
        <View>
            <ScrollView>
                {payments.map((payment, index) => (
                    <TouchableOpacity key={index}>
                        <HistoryCard
                            date={format(
                                new Date(payment.createdAt),
                                'dd MMM, HH:mm',
                            )}
                            title={paymentStatus[payment.paymentID]}
                            content={paymentContet[payment.paymentID]}
                            amount={formatIDRCurrency(payment.paymentAmount)}
                            image={{
                                uri:
                                    payment.accountID === users.accountID
                                        ? `data:image/jpeg;base64,${payment.friend.imageAccount2}`
                                        : `data:image/jpeg;base64,${payment.friend.imageAccount1}`,
                            }}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default PaymentScreen;
