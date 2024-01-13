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
import paymentService from '../../services/PaymentService';

function CompletePaymentSpiltBill({ navigation, route }) {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.user);
    const { phoneNumber } = useSelector((state) => state.ui);
    const { userService } = useContext(ServiceContext);
    const [splitBill, setSplitBill] = useState({});

    useEffect(async () => {
        try {
            dispatch(
                userAction(async () => {
                    const result =
                        await userService.fetchUserByPhoneNumber(phoneNumber);
                    return result;
                }),
            );
        } catch (e) {
            console.log('message == ', e);
        }
    }, []);

    useEffect(async () => {
        const result = await paymentService.completePaymentSplit(
            users.paymentID,
        );
        setSplitBill(result.data);
    }, []);

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
                            uri: `data:image/jpeg;base64,${users.profilePhoto}`,
                        }}
                        style={styles.avatarStyle}
                    />
                    <Text style={styles.textStyle}>{users?.firstName}</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.textStyle}>To :</Text>
                    <Image
                        source={{
                            uri: `data:image/jpeg;base64,${splitBill.friendImage}`,
                        }}
                        style={styles.avatarStyle}
                    />
                    <Text style={styles.textStyle}>
                        {splitBill.friendImage}
                    </Text>
                </View>
            </View>
        );
    };

    const renderAmount = () => {
        return (
            <View style={{ marginTop: '20%' }}>
                <Text style={styles.textStyle}>Amount Sent</Text>
                <Text style={styles.textStyle}>
                    {' '}
                    Rp. {splitBill.paymentAmount}
                </Text>
            </View>
        );
    };
    return (
        <SafeAreaView style={styles.wrapper}>
            {renderHeader()}
            {renderUser()}
            {renderAmount()}
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
    textStyle: { fontSize: 22, fontWeight: '700' },
    userArea: {
        width: '50%',
        marginTop: '15%',
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
