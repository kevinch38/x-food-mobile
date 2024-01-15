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
import * as Icon from 'react-native-feather';
import React, { useState } from 'react';

function SplitBillTrack({ navigation, route }) {
    const [requestPayment, setRequestPayment] = useState(
        route.params?.requestPayment,
    );

    const imageUrl =
        'https://pixabay.com/get/g1905cc00441dc61d2c96b34edd2216241e5cdb87dfebe3fa18c7ee099198466cf6c52eed7f0fdd476deefee6b71574ecf0813154b02c103e1a0d4ed36be602b72906916bfc382c102a0b45d5b70a99ce_640.png';

    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.btnBack}
                    onPress={() =>
                        navigation.navigate('SplitBillAddPosition', {
                            requestPayment,
                        })
                    }
                >
                    <Icon.ChevronLeft
                        width={24}
                        height={24}
                        strokeWidth={3}
                        color={'#000'}
                    />
                </TouchableOpacity>
                <Text style={styles.titleHeader}>Track Your Bill</Text>
                <Image
                    source={require('../../assets/images/profile.png')}
                    style={styles.imageProfile}
                />
            </View>
        );
    };
    const renderTrack = () => {
        return (
            <View style={styles.trackContainer}>
                <View style={styles.cardContainer}>
                    {requestPayment?.map((request) =>
                        request.orderItems?.map((r) => (
                            <View style={styles.card}>
                                <View style={styles.avatarContainer}>
                                    <View style={styles.avatarTrack}>
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
                                        <View style={styles.nameTrack}>
                                            <Text style={styles.titleTrack}>
                                                Requested to
                                            </Text>
                                            <Text style={styles.name}>
                                                {request.friendName}
                                            </Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={styles.now}>Now</Text>
                                        <Text style={[styles.statusNow]}>
                                            Waiting for{'\n'} Payment
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <Text style={styles.item}>
                                        {r.itemName}
                                    </Text>
                                    <View style={styles.priceContainer}>
                                        <Text style={styles.price}>
                                            {request.paymentAmount}
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
                {renderTrack()}
            </ScrollView>
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
    trackContainer: {
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
    avatarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    avatarTrack: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 26,
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 64,
    },
    nameTrack: {
        marginLeft: 12,
    },
    requestedContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleTrack: {
        fontWeight: '600',
        fontSize: 15,
    },
    now: {
        marginTop: 16,
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'right',
        color: '#9796A1',
    },
    statusNow: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'right',
        color: '#D77400',
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
});
export default SplitBillTrack;
