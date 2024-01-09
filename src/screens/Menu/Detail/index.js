import {
    Button,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import BackButton from '../../../components/backButton';
import Color from '../../../assets/Color';
import iconBag from '../../../assets/icons/bag.png';
import { RoundedCheckbox } from 'react-native-rounded-checkbox';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
    addTempCartToCart,
    addToTempCart,
    emptyTempCart,
    removeFromTempCart,
    selectCartItemsById,
    updateItem,
} from '../../../slices/cartSlice';

const Detail = ({ navigation }) => {
    const dispatch = useDispatch();
    const route = useRoute();
    // const cartItems = useSelector(selectCartItems);
    const item = route.params?.item;
    const { tempItems } = useSelector((state) => state.cart);
    let defaultPrice = item.isDiscounted
        ? item.discountedPrice
        : item.initialPrice;
    const [itemVariety, setItemVariety] = useState([]);
    let [price, setPrice] = useState(defaultPrice);

    const base64StringImage = `data:image/jpeg;base64,${item.image}`;

    const totalItems = useSelector((state) =>
        selectCartItemsById(state, item.itemID),
    );

    // useEffect(() => {
    //     if (tempItems.length === 0) {
    //         idxRef.current = 0;
    //     }
    // }, [tempItems]);

    // useEffect(() => {
    //     if (tempItems.length < 1) {
    //         navigation.navigate('MenuDetail');
    //     }
    // }, [tempItems.length]);

    useEffect(() => {
        dispatch(
            updateItem({
                itemVarieties: itemVariety,
                itemPrice: price,
            }),
        );
    }, [itemVariety, price]);

    useEffect(() => {
        if (tempItems <= 0) {
            handleIncrease();
        }
    }, []);
    const handleIncrease = () => {
        const cartItem = {
            ...item,
            // idx: (idxRef.current += 1),
            itemPrice: price,
            itemVarieties: itemVariety.length > 0 ? itemVariety : [],
        };
        dispatch(addToTempCart(cartItem));
    };
    const handleDecrease = () => {
        dispatch(
            removeFromTempCart({
                itemID: item.itemID,
                itemVarieties: itemVariety.length > 0 ? itemVariety : [],
            }),
        );
    };

    const handleBack = () => {
        navigation.navigate('Menu');
    };

    const handleVariety = (checked, varietyPrice, subVariety) => {
        setPrice((price) => price + (checked ? varietyPrice : -varietyPrice));

        if (checked) {
            const updatedItemVarieties = [...itemVariety, subVariety];
            setItemVariety(updatedItemVarieties);
        } else {
            const updatedItemsVariety = itemVariety.filter(
                (itemVariety) => itemVariety !== subVariety,
            );
            setItemVariety(updatedItemsVariety);
        }
        console.log(itemVariety, '==== updateItemVarieties');
    };

    const handleAddToCart = () => {
        dispatch(addTempCartToCart(tempItems));
        dispatch(emptyTempCart());

        navigation.navigate('Cart');
    };

    return (
        <SafeAreaView style={styles.wrapper}>
            <ScrollView>
                <BackButton onPress={handleBack} />
                {/*<Button title={'hh'} onPress={console.log(tempItems)} />*/}
                <Image
                    source={{ uri: base64StringImage }}
                    style={{
                        marginTop: '5%',
                        width: '90%',
                        height: 206,
                        marginHorizontal: '5%',
                        borderRadius: 10,
                    }}
                />
                <Text
                    style={{
                        marginTop: 10,
                        fontWeight: '900',
                        fontSize: 24,
                        marginHorizontal: '5%',
                    }}
                >
                    {item.itemName}
                </Text>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: '5%',
                    }}
                >
                    <Text
                        style={{
                            marginTop: 10,
                            fontWeight: '400',
                            fontSize: 20,
                            marginHorizontal: '5%',
                        }}
                    >
                        {/*Rp. {price * qty}*/}
                        Rp.{' '}
                        {item.isDiscounted
                            ? item.discountedPrice
                            : item.initialPrice}
                    </Text>

                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Button
                            disabled={tempItems.length <= 1}
                            onPress={handleDecrease}
                            title="-"
                            buttonStyle={{
                                width: 40,
                                height: 40,
                                backgroundColor: Color.primary,
                                borderRadius: 40 / 2,
                            }}
                            titleStyle={{ fontWeight: 'bold' }}
                        />
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '900',
                                marginTop: '5%',
                                marginHorizontal: '8%',
                            }}
                        >
                            {tempItems.length}
                        </Text>
                        <Button
                            onPress={handleIncrease}
                            title="+"
                            buttonStyle={{
                                width: 40,
                                height: 40,
                                backgroundColor: Color.primary,
                                borderRadius: 40 / 2,
                            }}
                            titleStyle={{ fontWeight: 'bold' }}
                        />
                    </View>
                </View>
                {item.itemVarieties.map((v, idx) => {
                    return (
                        <View key={idx}>
                            <View style={styles.wrapperTitle}>
                                <Text style={styles.titleVariety}>
                                    {v.variety.varietyName}
                                </Text>
                            </View>
                            <View
                                style={{
                                    marginHorizontal: '5%',
                                    marginTop: '2%',
                                }}
                            >
                                {v.variety.varietySubVarieties.map((s, idx) => {
                                    return (
                                        <View
                                            key={idx}
                                            style={styles.lineVariety}
                                        >
                                            <View
                                                style={
                                                    styles.wrapperNameVariaety
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.textNameVariety
                                                    }
                                                >
                                                    {s.subVariety.subVarName}
                                                </Text>
                                            </View>
                                            <View style={styles.wrapperPrice}>
                                                <Text style={styles.textPrice}>
                                                    + Rp{' '}
                                                    {s.subVariety.subVarPrice}
                                                </Text>
                                            </View>
                                            <View
                                                style={styles.roundedCheckBox}
                                            >
                                                <RoundedCheckbox
                                                    text={''}
                                                    checkedColor={Color.primary}
                                                    uncheckedColor="#fff"
                                                    outerStyle={
                                                        styles.styleCheckBox
                                                    }
                                                    innerStyle={
                                                        styles.styleCheckBox
                                                    }
                                                    onPress={(checked) =>
                                                        handleVariety(
                                                            checked,
                                                            s.subVariety
                                                                .subVarPrice,
                                                            s.subVariety,
                                                        )
                                                    }
                                                />
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
            <TouchableOpacity
                onPress={handleAddToCart}
                style={{
                    width: '100%',
                    height: 100,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        width: 200,
                        height: 60,
                        backgroundColor: Color.primary,
                        borderRadius: 200 / 2,
                        position: 'relative',
                        flexDirection: 'row',
                    }}
                >
                    <View
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 50 / 2,
                            backgroundColor: '#fff',
                            marginLeft: '3%',
                            marginVertical: 5,
                        }}
                    >
                        <Image
                            source={iconBag}
                            style={{
                                height: 20,
                                width: 21,
                                position: 'absolute',
                                zIndex: 1,
                                top: '25%',
                                left: '25%',
                            }}
                        />
                    </View>
                    <Text
                        style={{
                            marginLeft: '10%',
                            marginVertical: '8%',
                            fontWeight: '500',
                            fontSize: 17,
                            color: '#fff',
                        }}
                    >
                        add to cart
                    </Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        height: '100%',
        backgroundColor: '#fff',
    },
    roundedCheckBox: {
        width: 22,
        height: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Color.primary,
        borderWidth: 3,
        borderRadius: 22 / 2,
    },
    wrapperTitle: {
        width: '100%',
        height: 41,
        backgroundColor: Color.primary,
        marginTop: '5%',
    },
    titleVariety: {
        fontWeight: '400',
        fontSize: 20,
        marginHorizontal: '5%',
        marginTop: '2%',
        color: '#fff',
    },
    lineVariety: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '1%',
    },
    wrapperNameVariaety: { width: 200 },
    textNameVariety: {
        color: '#000',
        fontSize: 16,
        fontWeight: '500',
    },
    wrapperPrice: { width: 100 },
    textPrice: {
        textAlign: 'left',
        color: '#979797',
        fontSize: 16,
        fontWeight: '500',
    },
    styleCheckBox: {
        width: 18,
        height: 18,
    },
});

export default Detail;
