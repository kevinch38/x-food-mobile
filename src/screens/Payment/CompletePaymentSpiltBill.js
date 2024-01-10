import React from 'react';
import {
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Color from '../../assets/Color';

function CompletePaymentSpiltBill() {
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
                        source={require('../../assets/images/avatar-1.png')}
                        style={styles.avatarStyle}
                    />
                    <Text style={styles.textStyle}>Erika</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.textStyle}>To :</Text>
                    <Image
                        source={require('../../assets/images/avatar-2.png')}
                        style={styles.avatarStyle}
                    />
                    <Text style={styles.textStyle}>Eve</Text>
                </View>
            </View>
        );
    };

    const renderAmount = () => {
        return (
            <View style={{ marginTop: '20%' }}>
                <Text style={styles.textStyle}>Amount Sent</Text>
                <Text style={styles.textStyle}> Rp. 55.000</Text>
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
