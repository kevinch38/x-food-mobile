import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { formatIDRCurrency } from '../../utils/utils';

const OrderHistoryCard = ({
    image,
    items,
    title,
    date,
    status,
    orderValue,
    isSplit,
}) => {
    let statusColor = '#000';

    if (status === 'Waiting for payment') {
        statusColor = '#FFA500';
    } else if (status === 'Order Done') {
        statusColor = '#4EE476';
    } else if (status === 'Order Rejected') {
        statusColor = '#FF0000';
    } else {
        statusColor = '#FF0000';
    }
    return (
        <>
            <View style={styles.card}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginTop: 20 }}>
                        <View style={styles.image}>
                            <Image
                                source={{
                                    uri: `data:image/jpeg;base64,${image}`,
                                }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 18.214,
                                }}
                                resizeMode="cover"
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginLeft: -20,
                            marginTop: 25,
                            flexWrap: 'wrap'
                        }}
                    >
                        <View>
                            <Text style={{ fontSize: 12, color: '#9796A1' }}>
                                {date}
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 900, fontSize: 16 }}>
                                    {title}
                                </Text>
                                <Text
                                    style={{
                                        marginLeft: 14,
                                        fontSize: 10,
                                        marginTop: 3,
                                    }}
                                >
                                    {isSplit ? `Split` : ``}
                                </Text>
                            </View>
                            <Text
                                style={{
                                    fontWeight: 900,
                                    fontSize: 12,
                                    color: statusColor,
                                }}
                            >
                                {status}
                            </Text>
                        </View>
                        <View style={{ flex: 1, flexWrap: 'wrap', marginLeft: 5 }}>
                            <Text style={{ fontSize: 12, color: '#9796A1' }}>{items} Items</Text>
                            <Text numberOfLines={2} ellipsizeMode="tail" style={{ color: '#FE724C', flexWrap: 'wrap' }}>
                                {orderValue}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    card: {
        width:'100%',
        height: 120,
        flexDirection: 'row',
        marginBottom: 20,
        padding: 20,
        alignItems: 'center',

        // justifyContent:"center",
        borderRadius: 18.214,
        backgroundColor: '#FFF',
        elevation: 5,
        shadowColor: '#D3D1D8',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1

    },
    image: {
        margin: 40,
        width: 60,
        height: 60,
        borderRadius: 18.214,
        backgroundColor: '#FFF',
        elevation: 10,
        shadowColor: '#D3D1D8',
        shadowOffset: {
            width: 18.214,
            height: 18.214,
        },
        shadowOpacity: 0.25,
        shadowRadius: 36.42,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -2,
        marginLeft: -8,
    },
});

export default OrderHistoryCard;
