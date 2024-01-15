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
import Button from '../../components/button';
import React, { useState } from 'react';

function SplitBillSuccess({ navigation, route }) {
    const [requestPayment, setRequestPayment] = useState(
        route.params?.requestPayment,
    );

    const imageUrl =
        'https://pixabay.com/get/g1905cc00441dc61d2c96b34edd2216241e5cdb87dfebe3fa18c7ee099198466cf6c52eed7f0fdd476deefee6b71574ecf0813154b02c103e1a0d4ed36be602b72906916bfc382c102a0b45d5b70a99ce_640.png';

    const orderID = requestPayment[0].orderID;

    const renderStruct = () => {
        return (
            <View>
                <View style={styles.struckContainer}>
                    <Text style={styles.ticketStruck}>Order ID #{orderID}</Text>
                    <Text style={styles.dateStruck}>April 8th, 2022</Text>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../assets/images/mechant-logo.png')}
                            style={styles.imageLogo}
                        />
                        <Text style={styles.statusOrder}>Order Completed</Text>
                    </View>
                    {requestPayment?.map((request, index) =>
                        request.orderItems?.map((r) => (
                            <View style={styles.itemOrderContainer} key={index}>
                                <View style={styles.itemOrder}>
                                    <Text style={styles.item}>
                                        {r.itemName}
                                    </Text>
                                    <Text style={styles.priceTotal}>
                                        Rp.{' '}
                                        {request.paymentAmount.toLocaleString()}
                                    </Text>
                                </View>
                                <View style={styles.priceContainer}>
                                    <Text style={styles.price}>
                                        Rp{' '}
                                        {request.paymentAmount.toLocaleString()}
                                    </Text>
                                    <Text style={styles.price}>1x</Text>
                                </View>
                                <View style={styles.avatarContainer}>
                                    {request.imageFriend ? (
                                        <Image
                                            source={{
                                                uri: `data:image/jpeg;base64,${request.imageFriend}`,
                                            }}
                                            style={styles.avatar}
                                        />
                                    ) : (
                                        <Image
                                            source={{
                                                uri: imageUrl,
                                            }}
                                            style={styles.avatar}
                                        />
                                    )}
                                </View>
                            </View>
                        )),
                    )}

                    <View style={styles.btnTrack}>
                        <Button
                            onPress={() =>
                                navigation.navigate('SplitBillTrack', {
                                    requestPayment,
                                })
                            }
                            title={'Track'}
                            buttonStyle={styles.trackButtonStyle}
                            titleStyle={styles.trackTitleStyle}
                        />
                        <Text style={styles.textTotal}>Total:</Text>
                        <Text style={styles.priceTotal}>Rp 155,000</Text>
                    </View>
                </View>
                <View style={styles.circleContainer}>
                    <View style={[styles.circle, styles.leftCircle]} />
                    <View style={[styles.circle, styles.rightCircle]} />
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                {renderStruct()}
            </ScrollView>
            <View style={styles.btnContainer}>
                <Button
                    onPress={() => navigation.navigate('Tabs')}
                    title={'Done'}
                    titleStyle={styles.titleStyle}
                    buttonStyle={styles.buttonStyle}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: Color.primary,
    },
    struckContainer: {
        backgroundColor: '#fff',
        marginHorizontal: 15,
        marginVertical: 47,
        paddingHorizontal: 20,
        paddingVertical: 24,
        borderRadius: 20,
    },
    ticketStruck: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
    },
    dateStruck: {
        fontSize: 14,
        fontWeight: '400',
    },
    logoContainer: {
        marginVertical: 24,
        alignItems: 'center',
    },
    imageLogo: {
        width: 100,
        marginBottom: 16,
    },
    statusOrder: {
        fontSize: 20,
        fontWeight: '600',
    },
    itemOrderContainer: {
        marginBottom: 32,
    },
    itemOrder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    item: {
        fontSize: 16,
        fontWeight: '400',
    },
    priceTotal: {
        fontSize: 16,
        fontWeight: '600',
    },
    priceContainer: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    price: {
        fontSize: 14,
        fontWeight: '200',
        marginRight: 40,
    },
    avatarContainer: {
        flexDirection: 'row',
    },
    avatar: {
        width: 28,
        height: 28,
        borderRadius: 28,
        marginRight: 8,
    },
    btnTrack: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    trackButtonStyle: {
        width: 100,
        height: 34,
    },
    trackTitleStyle: {
        fontSize: 16,
        fontWeight: '500',
    },
    textTotal: {
        fontSize: 20,
        fontWeight: '600',
    },
    circleContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        top: '50%',
    },
    circle: {
        width: 24,
        height: 24,
        borderRadius: 24,
        backgroundColor: Color.primary,
    },
    leftCircle: {
        marginLeft: 3,
    },
    rightCircle: {
        marginRight: 3,
    },
    btnContainer: {
        marginTop: -48,
        backgroundColor: Color.primary,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 24,
        paddingBottom: 52,
        paddingHorizontal: 34,
    },
    buttonStyle: {
        borderRadius: 20,
        width: '100%',
        backgroundColor: '#34A853',
    },
    titleStyle: {
        fontSize: 16,
        fontWeight: '600',
    },
});
export default SplitBillSuccess;
