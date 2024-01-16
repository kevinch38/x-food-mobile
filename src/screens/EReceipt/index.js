import {
    BackHandler,
    Image,
    ImageBackground,
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
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import OrderService from '../../services/OrderService';

function EReceipt({ navigation }) {
    const orderService = OrderService();
    const route = useRoute();
    const orderId = route.params?.orderID;
    const [order, setOrder] = useState();
    console.log('ini order id', orderId);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => true,
        );
        return () => backHandler.remove();
    }, [order]);

    useEffect(() => {
        fetchOrderByID();
    }, [orderId]);

    const fetchOrderByID = async () => {
        try {
            const getOrder = await orderService.getOrderById(orderId);
            if (orderId) setOrder(getOrder);
        } catch (error) {
            console.error('Error fetching user data1:', error);
        }
    };
    // console.log(order?.data.quantity, '========') ;
    const dataOrder = order?.data;
    // console.log(dataOrder?.orderID, "ahahahaahahahah")

    const handleToHome = () => {
        navigation.navigate('Tabs');
    };

    const renderHeader = () => {
        return (
            <View style={styles.imageController}>
                <Image
                    style={styles.imageHeader}
                    source={{
                        uri: `data:image/jpeg;base64,${dataOrder?.image}`,
                    }}
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

    // console.log("ini =============>", route.params.orderItems[0]);

    const renderContent = () => {
        return (
            <View style={{ alignItems: 'center', height: '60%', width: '90%' }}>
                <ImageBackground
                    source={require('../../assets/images/test.png')}
                    style={{
                        height: '100%',
                        width: '100%',
                        marginTop: '20%',
                    }}
                    resizeMode={'stretch'}
                >
                    <View
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: -10,
                            height: 20,
                            width: 20,
                            backgroundColor: '#EC9D3F',
                            borderRadius: 100 / 2,
                        }}
                    />
                    <View
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: -10,
                            height: 20,
                            width: 20,
                            backgroundColor: '#EC9D3F',
                            borderRadius: 100 / 2,
                        }}
                    />
                    <View style={{ marginLeft: '5%' }}>
                        <Text
                            style={{
                                marginTop: '5%',
                                fontWeight: 'bold',
                                fontSize: 16,
                            }}
                        >
                            Order ID {dataOrder?.orderID}
                        </Text>
                        <Text
                            style={{
                                marginTop: '3%',
                                fontSize: 14,
                            }}
                        >
                            {dataOrder?.date}
                        </Text>
                    </View>
                    <View
                        style={{
                            zIndex: 9999,
                            marginTop: '7%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            style={{ width: 130, height: 130 }}
                            source={{
                                uri: `data:image/jpeg;base64,${dataOrder?.image}`,
                            }}
                        />
                        <Text
                            style={{
                                fontWeight: '700',
                                fontSize: 20,
                                marginTop: '5%',
                            }}
                        >
                            Order Completed
                        </Text>

                        {dataOrder?.orderItems?.map((order) => (
                            <View style={{ width: '100%', marginTop: '5%' }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-evenly',
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontWeight: 400,
                                        }}
                                    >
                                        {order.itemName}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 400,
                                        }}
                                    >
                                        x{order.quantity}
                                    </Text>
                                    <Text
                                        style={{
                                            fontWeight: '700',
                                            fontSize: 16,
                                        }}
                                    >
                                        Rp {order.price}
                                    </Text>
                                </View>
                                <View style={{ marginLeft: '9%' }}>
                                    {order.orderItemSubVarieties.length > 0 && (
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontWeight: 400,
                                                marginTop: 10,
                                            }}
                                        >
                                            [
                                            {order.orderItemSubVarieties
                                                .map(
                                                    (or) =>
                                                        or.subVariety
                                                            .subVarName,
                                                )
                                                .join(', ')}
                                            ]
                                        </Text>
                                    )}
                                </View>
                            </View>
                        ))}

                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: 20,
                                marginLeft: '40%',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: 700,
                                    marginRight: 10,
                                }}
                            >
                                Total
                            </Text>
                            <Text style={{ fontSize: 16, fontWeight: 700 }}>
                                Rp {dataOrder?.orderValue}
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    };

    const renderFooter = () => {
        return (
            <View
                style={{
                    width: '100%',
                    position: 'absolute',
                    top: 650,
                    bottom: '10%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {route.params.isSplit ? (
                    ``
                ) : (
                    <Button
                        onPress={() =>
                            navigation.navigate('SplitBill', { order })
                        }
                        buttonStyle={{
                            width: '80%',
                            borderRadius: 20,
                            marginBottom: 15,
                            backgroundColor: '#029094',
                        }}
                        title={'Split Bill'}
                        titleStyle={{ fontWeight: 'bold', fontSize: 16 }}
                    />
                )}

                <Button
                    onPress={handleToHome}
                    buttonStyle={{
                        width: '80%',
                        borderRadius: 20,
                        backgroundColor: '#34A853',
                    }}
                    title={'Done'}
                    titleStyle={{ fontWeight: 'bold', fontSize: 16 }}
                />
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.controller}>
            <View style={{ height: '100%', alignItems: 'center' }}>
                {/*{renderHeader()}*/}
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
        backgroundColor: '#EC9D3F',
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
        marginTop: '10%',
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
export default EReceipt;
