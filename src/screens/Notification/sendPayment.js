import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Color from '../../assets/Color';
import BackButton from '../../components/backButton';
import Account from '../../components/account';
import Avatar from '../../assets/images/avatar-2.png';
import Avatar2 from '../../assets/images/avatar-1.png';
import Button from '../../components/button';
import PaymentReceipt from '../../components/paymentReceipt';

function SendPayment() {
    const datas = [
        {
            name: 'Lontong Sayur',
            Variety: 'pedas, Extra Tempe Goreng',
        },
        {
            name: 'Lontong Balap',
            Variety: 'Tidak Peda, Extra Tempe Tahu',
        },
        {
            name: 'Sate Padang',
            Variety: 'pedas',
        },
    ];

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
                <Account image={Avatar2} />
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.wrapper}>
            {renderHeader()}
            <ScrollView>
                <PaymentReceipt
                    title={'Your Received A Payment from'}
                    name={'Eve'}
                    image={Avatar}
                    titleButton={'Done'}
                    totalAmount={'55,000'}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#fff',
    },
});

export default SendPayment;
