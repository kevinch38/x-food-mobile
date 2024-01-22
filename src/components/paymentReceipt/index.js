import React from 'react';
import { Image, Text, View } from 'react-native';
import Button from '../button';
import Color from '../../assets/Color';
import { formatIDRCurrency } from '../../utils/utils';

function PaymentReceipt({
    title,
    image,
    name,
    totalAmount,
    titleButton,
    order,
    onPress,
    disabled,
}) {
    const imageUrl =
        'https://pixabay.com/get/g1905cc00441dc61d2c96b34edd2216241e5cdb87dfebe3fa18c7ee099198466cf6c52eed7f0fdd476deefee6b71574ecf0813154b02c103e1a0d4ed36be602b72906916bfc382c102a0b45d5b70a99ce_640.png';

    const isDisabled = disabled ? 0.5 : 1;
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
                    source={
                        image
                            ? { uri: `data:image/jpeg;base64,${image}` }
                            : { uri: imageUrl }
                    }
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

                <Text style={{ fontSize: 36, fontWeight: '400' }}>
                    {name.toUpperCase()}
                </Text>
                <View style={{ marginVertical: '10%' }}>{order}</View>
                <Text style={{ fontWeight: '700', fontSize: 20 }}>
                    {' '}
                    Total Amount
                </Text>
                <Text style={{ fontWeight: '600', fontSize: 20 }}>
                    {' '}
                    {formatIDRCurrency(totalAmount)}
                </Text>
                <Button
                    onPress={onPress}
                    buttonStyle={{
                        backgroundColor: '#FFE500',
                        opacity: isDisabled,
                        height: 85,
                        width: 291,
                        marginVertical: '15%',
                    }}
                    title={titleButton}
                    titleStyle={{
                        fontSize: 32,
                        fontWeight: '900',
                        color: '#000',
                    }}
                    disabled={disabled}
                />
            </View>
        </View>
    );
}

export default PaymentReceipt;
