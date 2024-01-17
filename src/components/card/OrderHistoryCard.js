import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

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
                                // onLoadStart={() => console.log('Mulai memuat gambar')}
                                // onLoadEnd={() => console.log('Selesai memuat gambar')}
                                onError={(error) =>
                                    console.error('Error memuat gambar:', error)
                                }
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginLeft: -20,
                            marginTop: 25,
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
                                    {isSplit ? `` : `Split`}
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
                        <Text
                            style={{
                                marginLeft: 80,
                                fontSize: 12,
                                color: '#9796A1',
                                position: 'absolute',
                            }}
                        >
                            {items} Items
                        </Text>
                        <Text
                            style={{
                                marginLeft: 125,
                                color: '#FE724C',
                                position: 'absolute',
                            }}
                        >
                            Rp.{orderValue}
                        </Text>
                    </View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 323,
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
            width: 18.214,
            height: 18.214,
        },
        shadowOpacity: 0.25,
        shadowRadius: 36.42,
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
