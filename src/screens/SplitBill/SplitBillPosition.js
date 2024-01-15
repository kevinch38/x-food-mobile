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

    const handleSubmit = () => {
        let request = JSON.parse(JSON.stringify(requestPayment));

        request = request.map((req) => {
            delete req.friendName;
            delete req.imageFriend;

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
                <View style={styles.cardContainer}>
                    {requestPayment?.map((request) =>
                        request.orderItems?.map((r) => (
                            <View
                                style={styles.card}
                                key={request.friendAccountID}
                            >
                                <View style={styles.avatarAddPosition}>
                                    <Image
                                        source={require('../../assets/images/avatar.png')}
                                    />
                                    <View style={styles.nameAddPosition}>
                                        <Text style={styles.titleAddPosition}>
                                            Add Position to
                                        </Text>
                                        <Text style={styles.name}>
                                            {request.friendName}
                                        </Text>
                                    </View>
                                </View>

                                <View>
                                    <Text style={styles.item}>
                                        {r.itemName}
                                    </Text>
                                    <View style={styles.priceContainer}>
                                        <Text style={styles.price}>
                                            Rp 55,000
                                        </Text>
                                        <Text style={styles.price}>1x</Text>
                                        <Text style={styles.priceTotal}>
                                            Rp 55,000
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )),
                    )}
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
                {renderHeader()}
                {renderAddPosition()}
            </ScrollView>
            <View style={styles.btnContainer}>
                <Button
                    onPress={() => handleSubmit()}
                    title={'Request Payment'}
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
        marginBottom: 50,
    },
    cardContainer: {
        marginTop: 20,
    },
    card: {
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
});
export default SplitBillPosition;
