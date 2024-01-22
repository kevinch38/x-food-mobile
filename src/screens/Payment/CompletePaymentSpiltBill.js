import React, { useContext, useEffect, useState } from 'react';
import {
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Color from '../../assets/Color';
import { useDispatch, useSelector } from 'react-redux';
import { ServiceContext } from '../../context/ServiceContext';
import { userAction } from '../../slices/userSlice';
import PaymentService from '../../services/PaymentService';
import Loading from '../../components/loading/index';
import { formatIDRCurrency } from '../../utils/utils';

function CompletePaymentSpiltBill({ navigation, route }) {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.user);
    const { phoneNumber } = useSelector((state) => state.ui);
    const { userService } = useContext(ServiceContext);
    const [splitBill, setSplitBill] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const paymentID = route.params?.paymentID;
    // const { completePaymentSplit } = PaymentService;
    const completePayment = PaymentService();

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         navigation.navigate('Tabs');
    //     }, 1000000);

    //     return () => clearTimeout(timer);
    // }, []);

    useEffect(async () => {
        try {
            setIsLoading(true);
            dispatch(
                userAction(async () => {
                    const result =
                        await userService.fetchUserByPhoneNumber(phoneNumber);
                    return result;
                }),
            );

            setIsLoading(false);
        } catch (e) {
            console.log('message == ', e);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                // console.log('Fetching data for paymentID:', paymentID);

                if (paymentID) {
                    const result =
                        await completePayment.completePaymentSplit(paymentID);
                    // console.log('Fetched data:', result.data);
                    setSplitBill(result.data);
                }

                setIsLoading(false);
            } catch (e) {
                console.error(e);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [paymentID]);
    const renderHeader = () => {
        return (
            <View
                style={{
                    width: '100%',
                    alignItems: 'center',
                    marginTop: '20%',
                }}
            >
                <Image
                    source={require('../../assets/icons/confirm-icon.png')}
                    style={styles.confirmStyle}
                />
                <View style={{ marginTop: '10%' }}>
                    <Text style={styles.textStyle}>Money Sent!</Text>
                </View>
            </View>
        );
    };

    const renderUser = () => {
        return (
            <View style={styles.userArea}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.textStyle}>From :</Text>
                    <Image
                        source={{
                            uri: `data:image/jpeg;base64,${splitBill?.friend?.imageAccount2}`,
                        }}
                        style={styles.avatarStyle}
                    />
                    <Text style={styles.textStyle}>{users?.firstName}</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.textStyle}>To :</Text>
                    <Image
                        source={{
                            uri: `data:image/jpeg;base64,${splitBill?.friend?.imageAccount1}`,
                        }}
                        style={styles.avatarStyle}
                    />
                    <Text style={styles.textStyle}>
                        {splitBill?.friend?.accountFirstName1}
                    </Text>
                </View>
            </View>
        );
    };

    const renderAmount = () => {
        return (
            <View style={{ marginTop: '5%' }}>
                <Text style={styles.textStyle}>Amount Sent</Text>
                <Text style={styles.textStyle}>
                    {formatIDRCurrency(splitBill.paymentAmount)}
                </Text>
            </View>
        );
    };
    return (
        <SafeAreaView style={styles.wrapper}>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    {renderHeader()}
                    {renderUser()}
                    {renderAmount()}
                </>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: Color.primary,
        alignItems: 'center',
    },
    confirmStyle: { width: 190, height: 190 },
    textStyle: { fontSize: 22, fontWeight: '700', textAlign: 'center' },
    userArea: {
        width: '50%',
        marginTop: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    avatarStyle: {
        width: 80,
        height: 80,
        borderRadius: 27,
        marginVertical: '10%',
    },
});

export default CompletePaymentSpiltBill;
