import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import PaymentReceipt from '../../components/paymentReceipt';
import HistoryCard from '../../components/HistoryCard';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import UserService from '../../services/UserService';
import HistoryService from '../../services/HistoryService';
import Account from '../../components/account';
import BackButton from '../../components/backButton';
import Loading from '../../components/loading';
import BalanceService from '../../services/BalanceService';

function Notification() {
    const phoneNumber = useSelector((state) => state.ui.phoneNumber);
    const users = useSelector((state) => state.user.users);
    const dispatch = useDispatch();
    const userService = UserService();
    const historyService = HistoryService();
    const balanceService = BalanceService();
    const [id, setId] = useState('');
    const [payments, setPayments] = useState([]);
    const [paymentData, setPaymentData] = useState({});
    const [paymentTitle, setPaymentTitle] = useState({});
    const [paymentContet, setPaymentContent] = useState({});
    const [paymentTitleButton, setPaymentTitleButton] = useState({});
    const [totalBalance, setTotalBalance] = useState(0);
    const navigation = useNavigation();
    const [imageButtonClicked, setImageButtonClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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

    useEffect(() => {
        if (users.balance.balanceID) {
            getBalanceUser(users.balance.balanceID);
        }
    }, [users.balance.balanceID]);

    const fetchUserData = async (phoneNumber) => {
        try {
            const userData =
                await userService.fetchUserByPhoneNumber(phoneNumber);
            const accountID = userData.data.accountID;
            setId(accountID);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const getBalanceUser = async (balanceId) => {
        try {
            const response = await balanceService.fetchBalance(balanceId);
            setTotalBalance(response.data.totalBalance);
        } catch (e) {
            console.log('error get balance : ', e);
        }
    };

    const getAllOrderHistories = async () => {
        try {
            setIsLoading(true);
            const historyPayment =
                await historyService.getAllPaymentHistoryByAccountId(id);
            setPayments(historyPayment.data);

            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching user data2:', error);
            setIsLoading(false);
        }
    };

    const getAllHistoriesWithStatus = async () => {
        payments.forEach((payment) => {
            let status = '';
            let title = '';
            let content = '';
            let titleButton = '';
            if (
                payment.paymentType === 'ORDER' &&
                payment.paymentStatus === 'PENDING'
            ) {
                content = 'Requested';
            } else if (
                payment.paymentType === 'ORDER' &&
                payment.paymentStatus === 'SUCCESS'
            ) {
                content = 'Received';
            } else if (
                payment.paymentType === 'ORDER' &&
                payment.paymentStatus === 'FAILED'
            ) {
                content = 'Failed';
            } else if (
                payment.paymentType === 'ORDER' &&
                payment.paymentStatus === 'EXPIRED'
            ) {
                content = 'Expired';
            } else if (
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
                title = 'You Send Request Payment to';
                titleButton = 'Done';
            } else if (
                payment.paymentType === 'FRIEND' &&
                payment.paymentStatus === 'SUCCESS' &&
                payment.accountID !== users.accountID
            ) {
                content = 'Money Sent';
                title = 'Money Sent';
                titleButton = 'Done';
            } else if (
                payment.paymentType === 'FRIEND' &&
                payment.paymentStatus === 'SUCCESS' &&
                payment.accountID === users.accountID
            ) {
                content = 'Money Received';
                title = 'Your Received A Payment from';
                titleButton = 'Done';
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

            setPaymentTitle((prevTitle) => ({
                ...prevTitle,
                [payment.paymentID]: title,
            }));

            setPaymentContent((prevContent) => ({
                ...prevContent,
                [payment.paymentID]: content,
            }));

            setPaymentTitleButton((prevTitleButton) => ({
                ...prevTitleButton,
                [payment.paymentID]: titleButton,
            }));
        });
    };

    const handleToPin = (paymentID) => {
        navigation.navigate('Pin', {
            destination: 'CompletePaymentSpiltBill',
            paymentID: paymentID,
        });
    };

    const handleFilteredOrderItems = (orderItems, orderItemSplits) => {
        const filteredOrderItems = orderItems.filter((item) => {
            return orderItemSplits.includes(item.orderItemID);
        });

        const groupedItems = filteredOrderItems.reduce((groups, item) => {
            const itemName = item.itemName;
            const itemPrice = item.price;

            const key = `${itemName}-${itemPrice}`;

            if (!groups[key]) {
                groups[key] = {
                    itemName,
                    itemPrice,
                    count: 0,
                };
            }

            groups[key].count += 1;

            return groups;
        }, {});

        return Object.keys(groupedItems).map((key) => {
            const { itemName, itemPrice, count } = groupedItems[key];

            return (
                <View
                    key={key}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: '400',
                            marginHorizontal: '10%',
                        }}
                    >
                        {itemName}
                    </Text>
                    {/*<Text style={{ fontSize: 24, fontWeight: '400' }}>*/}
                    {/*    {itemPrice}*/}
                    {/*</Text>*/}
                    <Text style={{ fontSize: 18, fontWeight: '400' }}>
                        {count}x
                    </Text>
                </View>
            );
        });
    };

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
                    order={handleFilteredOrderItems(
                        paymentData.orderItems,
                        paymentData.orderItemSplits,
                    )}
                    totalAmount={paymentData.paymentAmount}
                    titleButton={paymentTitleButton[paymentData.paymentID]}
                    onPress={
                        paymentTitleButton[paymentData.paymentID] === 'Pay'
                            ? () => handleToPin(paymentData.paymentID)
                            : () => handleButtonPress('button2')
                    }
                    disabled={totalBalance <= 0}
                />
            </View>
        );
    };

    const renderListNotification = () => {
        const sortedPayments = payments.slice().sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        return (
            <ScrollView style={{ height: 'min-content' }}>
                {sortedPayments.map((payment, index) => (
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
                                    ? {
                                          uri: `data:image/jpeg;base64,${payment.friend.imageAccount2}`,
                                      }
                                    : {
                                          uri: `data:image/jpeg;base64,${payment.friend.imageAccount1}`,
                                      }
                            }
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    };

    const [activeButton, setActiveButton] = useState('button2');

    const handleButtonPress = (buttonName, payment) => {
        setActiveButton(buttonName);
        setPaymentData(payment);
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
                <BackButton
                    onPress={
                        activeButton === 'button1'
                            ? () => handleButtonPress('button2')
                            : () => handleButtonPress('button3')
                    }
                />
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

    const handleNavigateHome = () => {
        navigation.navigate('Tabs');
    };

    switch (activeButton) {
        case 'button1':
            selectedComponent = renderDetailNotification();
            break;
        case 'button2':
            selectedComponent = renderListNotification();
            break;
        default:
            selectedComponent = handleNavigateHome();
            break;
    }

    return (
        <View style={styles.wrapper}>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    {renderHeader()}
                    {selectedComponent}
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#fff',
    },
});

export default Notification;
