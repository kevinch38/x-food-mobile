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
import { formatIDRCurrency } from '../../utils/utils';

function SplitBillSuccess({ navigation, route }) {
    const [requestPayment, setRequestPayment] = useState(
        route.params?.requestPayment,
    );

    const orderID = requestPayment[0].orderID;
    const date = requestPayment[0].createdAt.slice(0, 10);
    const image = requestPayment[0].image;

    const groupedItems = {};
    requestPayment.forEach((request) => {
        request.orderItems.forEach((item) => {
            const itemName = item.itemName;
            if (!groupedItems[itemName]) {
                groupedItems[itemName] = [];
            }
            groupedItems[itemName].push({
                itemName: itemName,
                price: item.newPrice,
            });
        });
    });

    const groupedFriends = {};
    requestPayment.forEach((request) => {
        const friendName = request.friendName;
        const friendLastName = request.friendLastName;
        const imageFriend = request.imageFriend;

        request.orderItems.forEach((item) => {
            const itemName = item.itemName;

            if (!groupedFriends[itemName]) {
                groupedFriends[itemName] = [];
            }

            const friendEntry = groupedFriends[itemName].find(
                (friendEntry) => friendEntry.imageFriend === imageFriend,
            );

            if (!friendEntry) {
                groupedFriends[itemName].push({
                    imageFriend: imageFriend,
                    friendName: friendName,
                    friendLastName: friendLastName,
                    items: [
                        {
                            itemName: itemName,
                            price: item.newPrice,
                        },
                    ],
                });
            } else {
                friendEntry.items.push({
                    itemName: itemName,
                    price: item.newPrice,
                });
            }
        });
    });

    const result = Object.keys(groupedItems).map((itemName) => ({
        itemName: itemName,
        items: groupedItems[itemName],
        friends: groupedFriends[itemName] || {},
    }));

    let totalItemPrice = 0;

    Object.keys(groupedItems).forEach((itemName) => {
        const group = groupedItems[itemName];
        totalItemPrice += group.reduce(
            (subtotal, item) => subtotal + item.price,
            0,
        );
    });

    const renderStruct = () => {
        return (
            <View>
                <View style={styles.struckContainer}>
                    <Text style={styles.ticketStruck}>Order ID #{orderID}</Text>
                    <Text style={styles.dateStruck}>
                        <Text style={styles.dateStruck}>
                            {date.split('-').reverse().join('-')}
                        </Text>
                    </Text>
                    <View style={styles.logoContainer}>
                        <Image
                            source={{
                                uri: `data:image/jpeg;base64,${image}`,
                            }}
                            style={styles.imageLogo}
                        />
                        <Text style={styles.statusOrder}>Order Completed</Text>
                    </View>
                    {result.map((group, index) => (
                        <View style={styles.itemOrderContainer} key={index}>
                            <View style={styles.itemOrder}>
                                <Text style={styles.item}>
                                    {group.itemName}
                                </Text>
                                <Text style={styles.priceTotal}>
                                    Rp.{' '}
                                    {group.items.reduce(
                                        (total, item) => total + item.price,
                                        0,
                                    )}
                                </Text>
                            </View>
                            <View style={styles.priceContainer}>
                                <Text style={styles.price}>
                                    {formatIDRCurrency(group.items[0].price)}
                                </Text>
                                <Text style={styles.price}>
                                    {group.items.length}x
                                </Text>
                            </View>
                            <View style={styles.avatarContainer}>
                                {groupedFriends[group.itemName] &&
                                    groupedFriends[group.itemName].map(
                                        (friendEntry, friendIndex) => (
                                            <View key={friendIndex}>
                                                {friendEntry.imageFriend ? (
                                                    <Image
                                                        source={{
                                                            uri: `data:image/jpeg;base64,${friendEntry.imageFriend}`,
                                                        }}
                                                        style={styles.avatar}
                                                    />
                                                ) : (
                                                    <Image
                                                        source={{
                                                            uri: `https://ui-avatars.com/api/?name=${friendEntry.friendName}+${friendEntry.friendLastName}`,
                                                        }}
                                                        style={styles.avatar}
                                                    />
                                                )}
                                            </View>
                                        ),
                                    )}
                            </View>
                        </View>
                    ))}

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
                        <Text style={styles.priceTotal}>
                            {formatIDRCurrency(totalItemPrice)}
                        </Text>
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
        marginBottom: 100,
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
        height: 100,
        marginBottom: 16,
        borderRadius: 18,
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
        fontWeight: '400',
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
