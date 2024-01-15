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
import Button from '../../components/button';
import React, { useState } from 'react';
import * as Icon from 'react-native-feather';
import Color from '../../assets/Color';

function SplitBillAddPosition({ navigation, route }) {
    const friends = route.params?.avatarData;
    const order = route.params?.order;
    const orderItems = route.params?.order.data.orderItems;
    const [selectedFriend, setSelectedFriend] = useState({
        friendName: friends[0].accountFirstName2,
        friendID: friends[0].accountID2,
        friendImage: friends[0].imageAccount2,
    });

    const [requestPayment, setRequestPayment] = useState(
        friends.map((f) => ({
            accountID: f.accountID1,
            paymentAmount: 0.0,
            friendAccountID: f.accountID2,
            friendName: f.accountFirstName2,
            imageFriend: f.imageAccount2,
            orderID: order.data.orderID,
            orderItems: [],
        })),
    );

    const [selectedQuantities, setSelectedQuantities] = useState({});

    const handleIncrease = (item) => {
        const friendID = selectedFriend.friendID;
        setSelectedQuantities((prevQuantities) => ({
            ...prevQuantities,
            [`${friendID}_${item.orderItemID}`]:
                (prevQuantities[`${friendID}_${item.orderItemID}`] || 0) + 1,
        }));
        const tempRequest = requestPayment.find((a) => {
            return a.friendAccountID === selectedFriend.friendID;
        });
        tempRequest.orderItems.push({
            itemName: item.itemName,
            orderItemID: item.orderItemID,
        });
    };
    const handleDecrease = (item) => {
        const friendID = selectedFriend.friendID;
        if (selectedQuantities[`${friendID}_${item.orderItemID}`] <= 0) return;
        setSelectedQuantities((prevQuantities) => ({
            ...prevQuantities,
            [`${friendID}_${item.orderItemID}`]:
                prevQuantities[`${friendID}_${item.orderItemID}`] - 1 || 0,
        }));
        const temp = requestPayment.find((a) => {
            return a.friendAccountID === selectedFriend.friendID;
        });
        setRequestPayment([
            ...requestPayment,
            temp.orderItems.splice(
                temp.orderItems.indexOf({ orderItemID: item.orderItemID }),
                1,
            ),
        ]);
    };
    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.btnBack}
                    onPress={() => navigation.goBack()}
                >
                    <Icon.ChevronLeft
                        width={24}
                        height={24}
                        strokeWidth={3}
                        color={'#000'}
                    />
                </TouchableOpacity>
                <Text style={styles.titleHeader}>Add Positions</Text>
                <Image
                    source={require('../../assets/images/profile.png')}
                    style={styles.imageProfile}
                />
            </View>
        );
    };
    const renderAddPosition = () => {
        return (
            <View style={styles.addPositionContainer}>
                <TouchableOpacity style={styles.btnAdd}>
                    <Icon.UserPlus
                        width={32}
                        height={32}
                        strokeWidth={2}
                        color={Color.primary}
                    />
                </TouchableOpacity>
                <View style={styles.cardContainer}>
                    <View style={styles.avatarAddPosition}>
                        <Image
                            source={require('../../assets/images/avatar.png')}
                        />
                        <View style={styles.nameAddPosition}>
                            <Text style={styles.titleAddPosition}>
                                Add Position to
                            </Text>
                            <Text style={styles.name}>
                                {selectedFriend.friendName}
                            </Text>
                        </View>
                    </View>
                    {orderItems.map((item) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.item}>{item.itemName}</Text>
                            <View style={styles.priceContainer}>
                                <Text style={styles.price}>
                                    Rp. {item.price.toLocaleString()}
                                </Text>
                                <Text style={styles.price}>
                                    {item.quantity}x
                                </Text>
                                <View style={styles.counterContainer}>
                                    <TouchableOpacity
                                        style={styles.btnCounter}
                                        onPress={() => handleDecrease(item)}
                                    >
                                        <Icon.Minus
                                            width={16}
                                            height={16}
                                            strokeWidth={3}
                                            color={'#fff'}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.amount}>
                                        {selectedQuantities[
                                            `${selectedFriend.friendID}_${item.orderItemID}`
                                        ] || 0}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.btnCounter}
                                        onPress={() => handleIncrease(item)}
                                    >
                                        <Icon.Plus
                                            width={16}
                                            height={16}
                                            strokeWidth={3}
                                            color={'#fff'}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        );
    };
    const renderChoiceAvatar = () => {
        return (
            <View style={styles.choiceAvatarContainer}>
                {friends.length > 1 &&
                    friends.map(
                        (friend, idx) =>
                            friend.accountID2 !== selectedFriend.friendID && (
                                <TouchableOpacity
                                    style={styles.btnChoiceAvatar}
                                    key={idx}
                                    onPress={() =>
                                        setSelectedFriend({
                                            ...selectedFriend,
                                            friendName:
                                                friend.accountFirstName2,
                                            friendID: friend.accountID2,
                                            friendImage: friend.imageAccount2,
                                        })
                                    }
                                >
                                    <Image
                                        source={require('../../assets/images/avatar.png')}
                                        style={styles.imageChoiceAvatar}
                                    />
                                    <Text style={styles.nameChoiceAvatar}>
                                        {friend.accountFirstName2}
                                    </Text>
                                </TouchableOpacity>
                            ),
                    )}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                {renderHeader()}
                {renderAddPosition()}
            </ScrollView>
            {renderChoiceAvatar()}
            <View style={styles.btnContainer}>
                <Button
                    onPress={() =>
                        navigation.navigate('SplitBillPosition', {
                            requestPayment,
                        })
                    }
                    title={'Next'}
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
        backgroundColor: '#fff',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 37,
        paddingHorizontal: 27,
    },
    btnBack: {
        width: 38,
        height: 38,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    titleHeader: {
        fontWeight: '500',
        fontSize: 18,
    },
    imageProfile: {
        height: 38,
        width: 38,
        borderRadius: 12,
    },
    addPositionContainer: {
        marginHorizontal: 27,
        marginBottom: 20,
    },
    btnAdd: {
        position: 'absolute',
        width: 31,
        height: 31,
        right: 0,
        justifyContent: 'flex-end',
    },
    cardContainer: {
        marginTop: 40,
        backgroundColor: 'rgba(255, 197, 41, 0.4)',
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    avatarAddPosition: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 26,
    },
    nameAddPosition: {
        marginLeft: 12,
    },
    titleAddPosition: {
        fontWeight: '600',
        fontSize: 15,
    },
    name: {
        fontWeight: '800',
        fontSize: 15,
    },
    itemContainer: {
        marginBottom: 40,
    },
    item: {
        fontWeight: '500',
        fontSize: 15,
        marginBottom: 10,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    price: {
        fontSize: 14,
        fontWeight: '200',
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnCounter: {
        backgroundColor: Color.primary,
        justifyContent: 'center',
        alignItems: 'center',
        width: 28,
        height: 28,
        borderRadius: 28,
    },
    amount: {
        fontWeight: '900',
        fontSize: 16,
        marginHorizontal: 8,
    },
    choiceAvatarContainer: {
        flexDirection: 'row',
        top: -50,
        justifyContent: 'center',
    },
    btnChoiceAvatar: {
        marginHorizontal: 6,
        alignItems: 'center',
    },
    imageChoiceAvatar: {
        width: 62,
        height: 62,
        marginBottom: 8,
    },
    nameChoiceAvatar: {
        fontSize: 12,
        fontWeight: '800',
    },
    btnContainer: {
        borderTopStartRadius: 24,
        borderTopEndRadius: 24,
        marginTop: -48,
        backgroundColor: '#fff',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 28,
        paddingHorizontal: 34,
    },
    buttonStyle: {
        borderRadius: 20,
        width: '100%',
    },
    titleStyle: {
        fontSize: 16,
        fontWeight: '600',
    },
});
export default SplitBillAddPosition;
