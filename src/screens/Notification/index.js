import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import BackButton from '../../components/backButton';
import Account from '../../components/account';
import Avatar from '../../assets/images/avatar-2.png';
import Avatar2 from '../../assets/images/avatar-1.png';
import PaymentReceipt from '../../components/paymentReceipt';
import { useSelector } from 'react-redux';
import UserService from '../../services/UserService';
import HistoryService from '../../services/HistoryService';
import { useEffect, useState } from 'react';
import HistoryCard from '../../components/HistoryCard';
import { format } from 'date-fns';

function Notification({ navigation }) {
    const users = useSelector((state) => state.user.users);

    const phoneNumber = useSelector((state) => state.ui.phoneNumber);
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
            setPayments(historyPayment.data);
            console.log('=========================>', historyPayment.data);
        } catch (error) {
            console.error('Error fetching user data2:', error);
        }
    };

    const getAllHistoriesWithStatus = async () => {
        // console.log("+++++++++++++++++++++++++>",payments);
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

    const handleToPin = (destination) => {
        navigation.navigate('Pin', destination);
    };

    const renderHeader = () => {
        return (
            <View
                style={{
                    width: '100%',
                    height: '10%',
                    justifyContent: 'center',
                    marginTop: '2%',
                }}
            >
                <BackButton />
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

    return (
        <SafeAreaView style={styles.wrapper}>
            {renderHeader()}

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
                            amount={payment.paymentAmount}
                            image={payment.friend.imageAccount2}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* <ScrollView>
                <PaymentReceipt
                    title={'You Receive A Split Bill From'}
                    name={'Eve'}
                    image={Avatar}
                    titleButton={'Pay'}
                    totalAmount={'55,000'}
                    onPress={() => handleToPin('CompletePaymentSpiltBill')}
                />
            </ScrollView> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Notification;
