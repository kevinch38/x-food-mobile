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
}) => {
    const base64StringImage = `data:image/jpeg;base64,${image}`;

    return (
        <TouchableOpacity onPress={onPress}>
            <View
                style={{
                    width: '90%',
                    height: 240,
                    marginHorizontal: '5%',
                    backgroundColor: '#fff',
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
                        backgroundColor: '#fff',
                        borderRadius: 104 / 2,
                        marginLeft: '2%',
                    }}
                >
                    <View style={{ flexDirection: 'row', marginLeft: '2%' }}>
                        <Text
                            style={{
                                fontSize: 18,
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
                                fontSize: 18,
                                fontWeight: '900',
                                marginTop: '7%',
                                textAlign: 'center',
                                textAlignVertical: 'center',
                            }}
                        >
                            {isDiscount ? discountedPrice : initialPrice}
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
                    }}
                />
                <View style={{ padding: '2%', marginLeft: '2%' }}>
                    <Text
                        style={{
                            fontWeight: '900',
                            fontSize: 16,
                        }}
                    >
                        {itemName}
                    </Text>
                    <Text
                        style={{
                            fontWeight: '400',
                            fontSize: 13,
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
