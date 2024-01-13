import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import MenuOne from '../../assets/images/menu-1.png';

const CardMenu = ({
    onPress,
    isDiscount,
    discountedPrice,
    itemName,
    itemDescription,
    initialPrice,
    image,
    itemStock,
}) => {
    const base64StringImage = `data:image/jpeg;base64,${image}`;

    const display = itemStock <= 0 ? '' : 'none';

    const opacity = itemStock <= 0 ? 0.7 : 1;
    const isOutOfStock =
        itemStock <= 0 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,1)';

    return (
        <TouchableOpacity onPress={onPress} disabled={itemStock <= 0}>
            <View
                style={{
                    width: '90%',
                    height: 240,
                    marginHorizontal: '5%',
                    backgroundColor: isOutOfStock,
                    borderRadius: 10,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 3,
                    },
                    shadowOpacity: 0.4,
                    shadowRadius: 2,
                    elevation: 5,
                    marginBottom: 10,
                    marginTop: 10,
                }}
            >
                <View
                    style={{
                        position: 'absolute',
                        top: 10,
                        left: 5,
                        zIndex: 1,
                        width: 120,
                        height: 45,
                        backgroundColor: isOutOfStock,
                        borderRadius: 104 / 2,
                        marginLeft: '2%',
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            marginLeft: '15%',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: '900',
                                marginTop: '7%',
                                marginRight: '5%',
                                textAlign: 'center',
                                textAlignVertical: 'center',
                                color: '#F08D18',
                            }}
                        >
                            Rp
                        </Text>
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: '900',
                                marginTop: '7%',
                                textAlign: 'center',
                                textAlignVertical: 'center',
                            }}
                        >
                            {isDiscount ? discountedPrice : initialPrice}
                        </Text>
                    </View>

                    <View
                        style={{
                            height: '100%',
                            borderRadius: 30 / 2,
                            backgroundColor: isOutOfStock,
                            marginTop: '15%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            opacity: 1,
                            display: display,
                            top: '50%',
                            left: '90%',
                        }}
                    >
                        <Text style={{ fontWeight: '700' }}>
                            {itemStock <= 0 ? 'Out of Stock' : ''}
                        </Text>
                    </View>
                </View>

                <Image
                    source={{ uri: base64StringImage }}
                    style={{
                        width: '100%',
                        height: 180,
                        resizeMode: 'cover',
                        borderRadius: 15,
                        opacity: opacity,
                    }}
                />
                <View
                    style={{
                        padding: '2%',
                        marginLeft: '2%',
                        backgroundColor: isOutOfStock,
                    }}
                >
                    <Text
                        style={{
                            fontWeight: '900',
                            fontSize: 18,
                            backgroundColor: isOutOfStock,
                        }}
                    >
                        {itemName}
                    </Text>
                    <Text
                        style={{
                            fontWeight: '400',
                            fontSize: 15,
                            backgroundColor: isOutOfStock,
                        }}
                    >
                        {itemDescription}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CardMenu;
