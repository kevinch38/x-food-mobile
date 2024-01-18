import {
    BackHandler,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import BackButton from '../../components/backButton';
import { theme } from '../../theme';
import * as Progress from 'react-native-progress';
import Button from '../../components/button';
import { useRoute } from '@react-navigation/native';
import { useEffect } from 'react';

function Complete({ navigation }) {
    const route = useRoute();
    const pointLoyalty = route.params?.pointLoyalty;
    const orderID = route.params?.orderID;
    const accountID = route.params?.accountID;

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => true,
        );
        return () => backHandler.remove();
    }, []);
    const handleTrackOrder = (orderID, accountID) => {
        navigation.navigate('EReceipt', {
            orderID: orderID,
            accountID: accountID,
        });
    };

    const renderHeader = () => {
        return (
            <View style={styles.imageController}>
                <Image
                    style={styles.imageHeader}
                    source={require('../../assets/icons/confirm-icon.png')}
                />
                <Text style={styles.title}>
                    Order Confirmed, Your Food is On The Way :)
                </Text>
                <Text style={styles.subTitle}>
                    Your order has been successfully placed and has been
                    processed.
                </Text>
            </View>
        );
    };

    const renderContent = () => {
        return (
            <View style={[styles.imageController, { marginTop: '20%' }]}>
                <Image
                    source={require('../../assets/icons/dollar.png')}
                    style={{
                        height: 30,
                        width: 30,
                    }}
                />
                <Text style={styles.points}>
                    Congrats! You just got {pointLoyalty} points from your
                    order!
                </Text>
            </View>
        );
    };

    const renderFooter = () => {
        return (
            <View
                style={{
                    width: '100%',
                    position: 'absolute',
                    bottom: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Button
                    onPress={() => handleTrackOrder(orderID, accountID)}
                    buttonStyle={{ width: '80%', borderRadius: 20 }}
                    title={'Track your order'}
                    titleStyle={{ fontWeight: 'bold', fontSize: 16 }}
                />
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.controller}>
            <View style={{ height: '100%' }}>
                {renderHeader()}
                {renderContent()}
                {renderFooter()}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    controller: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#fff',
    },
    imageController: {
        marginTop: '10%',
        alignItems: 'center',
    },
    imageHeader: {
        width: 150,
        height: 150,
        marginTop: 46,
        marginBottom: 44,
    },
    title: {
        width: '80%',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    subTitle: {
        width: '60%',
        textAlign: 'center',
        marginTop: '5%',
        fontWeight: '300',
        fontSize: 13,
    },
    points: {
        width: '60%',
        textAlign: 'center',
        marginTop: '5%',
        fontWeight: '300',
        fontSize: 15,
    },
    inputPin: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    textInputStyle: {
        width: 54,
        height: 54,
        borderColor: theme.grey,
        borderWidth: 1,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 27,
        fontWeight: '500',
        color: theme.primary,
        marginTop: 62,
    },
    buttonForgotPin: {
        marginTop: 20,
        marginLeft: 31,
    },
    textForgotPin: {
        color: theme.primary,
        fontSize: 16,
        fontWeight: '600',
    },
});
export default Complete;
