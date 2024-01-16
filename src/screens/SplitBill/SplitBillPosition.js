import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import * as Icon from 'react-native-feather';
import Button from '../../components/button';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ServiceContext } from '../../context/ServiceContext';
import { splitBillAction } from '../../slices/splitBillSlice';

function SplitBillPosition({ navigation, route }) {
    const dispatch = useDispatch();
    const { splitBillService } = useContext(ServiceContext);
    const [requestPayment, setRequestPayment] = useState(
        route.params?.requestPayment,
    );

    const imageUrl =
        'https://pixabay.com/get/g1905cc00441dc61d2c96b34edd2216241e5cdb87dfebe3fa18c7ee099198466cf6c52eed7f0fdd476deefee6b71574ecf0813154b02c103e1a0d4ed36be602b72906916bfc382c102a0b45d5b70a99ce_640.png';

    const image = requestPayment[0].imageAccount;

    const handleSubmit = () => {
        let request = JSON.parse(JSON.stringify(requestPayment));

        request = request.map((req) => {
            delete req.friendName;
            delete req.imageFriend;
            delete req.imageAccount;

            req.orderItems = req.orderItems?.map((r) => r.orderItemID);
            return req;
        });

        dispatch(
            splitBillAction(async () => {
                try {
                    const result =
                        await splitBillService.saveSplitBill(request);
                    if (result.statusCode === 201) {
                        Alert.alert(
                            'Success',
                            'Successfully create payment',
                            [
                                {
                                    text: 'Ok',
                                    onPress: async () => {
                                        navigation.navigate(
                                            'SplitBillSuccess',
                                            { requestPayment },
                                        );
                                    },
                                },
                            ],
                            { cancelable: false },
                        );
                    } else {
                        Alert.alert('Error', 'Failed to create payment');
                    }
                } catch (e) {
                    console.error('Error request payment: ', e);
                    Alert.alert('Error', 'Failed to request payment');
                }
            }),
        );
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
                {image ? (
                    <Image
                        source={{
                            uri: `data:image/jpeg;base64,${image}`,
                        }}
                        style={styles.imageProfile}
                    />
                ) : (
                    <Image
                        source={{
                            uri: imageUrl,
                        }}
                        style={styles.imageProfile}
                    />
                )}
            </View>
        );
    };

    const uniqueFriendAccountID = [
        ...new Set(requestPayment?.map((request) => request.friendAccountID)),
    ];

    const renderAddPosition = uniqueFriendAccountID.map(
        (friendAccID, index, array) => {
            const isLastCard = index === array.length - 1;
            const friendRequestsWithSameFriendID = requestPayment.filter(
                (request) => request.friendAccountID === friendAccID,
            );
            return (
                <View
                    style={[
                        styles.addPositionContainer,
                        isLastCard && styles.lastCardMargin,
                    ]}
                    key={friendAccID}
                >
                    <View style={styles.cardContainer}>
                        <View style={styles.avatarAddPosition}>
                            {friendRequestsWithSameFriendID[0]?.imageFriend ? (
                                <Image
                                    source={{
                                        uri: `data:image/jpeg;base64,${friendRequestsWithSameFriendID[0].imageFriend}`,
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
                            <View style={styles.nameAddPosition}>
                                <Text style={styles.titleAddPosition}>
                                    Add Position to
                                </Text>
                                <Text style={styles.name}>
                                    {
                                        friendRequestsWithSameFriendID[0]
                                            ?.friendName
                                    }
                                </Text>
                            </View>
                        </View>
                        <View>
                            {requestPayment
                                .filter(
                                    (request) =>
                                        request.friendAccountID === friendAccID,
                                )
                                ?.map((request) =>
                                    request.orderItems?.map((r, index) => (
                                        <View
                                            key={index}
                                            style={styles.itemContainer}
                                        >
                                            <Text style={styles.item}>
                                                {r.itemName}
                                            </Text>
                                            <View style={styles.priceContainer}>
                                                <Text style={styles.price}>
                                                    Rp 55,000
                                                </Text>
                                                <Text style={styles.price}>
                                                    1x
                                                </Text>
                                                <Text style={styles.priceTotal}>
                                                    Rp 55,000
                                                </Text>
                                            </View>
                                        </View>
                                    )),
                                )}
                        </View>
                    </View>
                </View>
            );
        },
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                {renderHeader()}
                {renderAddPosition}
            </ScrollView>
            <View style={styles.btnContainer}>
                {requestPayment[0].orderItems.length < 1 ? (
                    <Button
                        onPress={() => handleSubmit()}
                        title={'Request Payment'}
                        disabled={true}
                        titleStyle={styles.titleStyle}
                        buttonStyle={[styles.buttonStyle, { opacity: 0.3 }]}
                    />
                ) : (
                    <Button
                        onPress={() => handleSubmit()}
                        title={'Request Payment'}
                        titleStyle={styles.titleStyle}
                        buttonStyle={styles.buttonStyle}
                    />
                )}
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
        marginBottom: 20,
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
    },
    lastCardMargin: {
        marginBottom: 80,
    },
    cardContainer: {
        marginBottom: 16,
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
        marginBottom: 10,
    },
    item: {
        fontWeight: '500',
        fontSize: 15,
        marginBottom: 4,
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
    priceTotal: {
        fontSize: 16,
        fontWeight: '600',
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
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 64,
    },
});
export default SplitBillPosition;
