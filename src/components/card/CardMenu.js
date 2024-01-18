import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';

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

    // const display = itemStock <= 0 ? '' : 'none';

    const opacity = itemStock <= 0 ? 0.7 : 1;
    const isOutOfStock =
        itemStock <= 0 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,1)';

    return (
        <TouchableOpacity onPress={onPress} disabled={itemStock <= 0}>
            <View style={[styles.card, { backgroundColor: isOutOfStock }]}>
                <View
                    style={[
                        styles.wrapperPrice,
                        { backgroundColor: isOutOfStock },
                    ]}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            marginLeft: '15%',
                        }}
                    >
                        <Text style={styles.price}>Rp</Text>
                        <Text style={styles.itemPrice}>
                            {isDiscount
                                ? discountedPrice.toLocaleString()
                                : initialPrice.toLocaleString()}
                        </Text>
                    </View>

                    {/*<View*/}
                    {/*    style={[*/}
                    {/*        styles.stock,*/}
                    {/*        { backgroundColor: isOutOfStock, display: display },*/}
                    {/*    ]}*/}
                    {/*>*/}
                    {/*    <Text style={{ fontWeight: '700' }}>*/}
                    {/*        {itemStock <= 0 ? 'Out of Stock' : ''}*/}
                    {/*    </Text>*/}
                    {/*</View>*/}
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
                        style={[
                            styles.itemName,
                            { backgroundColor: isOutOfStock },
                        ]}
                    >
                        {itemName}
                    </Text>
                    <Text
                        style={[
                            styles.itemDescription,
                            { backgroundColor: isOutOfStock },
                        ]}
                    >
                        {itemDescription}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CardMenu;

const styles = StyleSheet.create({
    card: {
        width: '90%',
        height: 240,
        marginHorizontal: '5%',
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
    },
    wrapperPrice: {
        position: 'absolute',
        top: 10,
        left: 5,
        zIndex: 1,
        width: 'max-content',
        height: 45,
        borderRadius: 104 / 2,
        marginLeft: '2%',
    },
    price: {
        fontSize: 20,
        fontWeight: '900',
        marginTop: '7%',
        marginRight: '5%',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#F08D18',
    },
    itemPrice: {
        fontSize: 20,
        fontWeight: '900',
        marginTop: '7%',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    stock: {
        height: '100%',
        borderRadius: 30 / 2,
        marginTop: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 1,
        top: '50%',
        left: '50%',
    },
    itemName: {
        fontWeight: '900',
        fontSize: 18,
    },
    itemDescription: {
        fontWeight: '400',
        fontSize: 15,
    },
});
