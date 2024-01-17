import React from 'react';
import { Image, Text, View } from 'react-native';
import Button from '../button';

function PaymentReceipt({
    title,
    image,
    name,
    totalAmount,
    titleButton,
    order,
    onPress,
}) {
    return (
        <View
            style={{
                backgroundColor: '#EC9D3F',
                height: 'min-content',
                width: '90%',
                marginHorizontal: '5%',
                borderRadius: 20,
                marginVertical: 10,
            }}
        >
            <View
                style={{
                    backgroundColor: '#EC9D3F',
                    width: 26,
                    height: 26,
                    borderRadius: 26 / 2,
                    position: 'absolute',
                    top: '50%',
                    left: -10,
                }}
            />
            <View
                style={{
                    backgroundColor: '#EC9D3F',
                    width: 26,
                    height: 26,
                    borderRadius: 26 / 2,
                    position: 'absolute',
                    top: '50%',
                    right: -10,
                }}
            />
            <View style={{ width: '100%', alignItems: 'center' }}>
                <Image
                    style={{
                        height: 180,
                        width: 180,
                        borderRadius: 20,
                        marginTop: '9%',
                    }}
                    source={{ uri: `data:image/jpeg;base64,${image}` }}
                />

                <Text
                    style={{
                        width: '50%',
                        textAlign: 'center',
                        fontSize: 22,
                        fontWeight: '700',
                        marginTop: '5%',
                    }}
                >
                    {title}
                </Text>

                <Text style={{ fontSize: 36, fontWeight: '400' }}>{name}</Text>
                <View style={{ marginVertical: '10%' }}>{order}</View>
                <Text style={{ fontWeight: '700', fontSize: 20 }}>
                    {' '}
                    Total Amount
                </Text>
                <Text style={{ fontWeight: '600', fontSize: 20 }}>
                    {' '}
                    {totalAmount}
                </Text>
                <Button
                    onPress={onPress}
                    buttonStyle={{
                        backgroundColor: '#FFE500',
                        height: 85,
                        width: 291,
                        marginVertical: '15%',
                    }}
                    title={titleButton}
                    titleStyle={{
                        fontSize: 32,
                        fontWeight: '700',
                        color: '#000',
                    }}
                />
            </View>
        </View>
    );
}

export default PaymentReceipt;
