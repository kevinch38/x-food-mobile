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
import React, { useEffect, useState } from 'react';
import BackButton from '../../../components/backButton';
import Button from '../../../components/button';
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
    updateItem,
} from '../../../slices/cartSlice';

const Detail = ({ navigation }) => {
    const dispatch = useDispatch();
    const route = useRoute();
    const item = route.params?.item;
    const { tempItems } = useSelector((state) => state.cart);
    let defaultPrice = item.isDiscounted
        ? item.discountedPrice
        : item.initialPrice;
    const [itemVariety, setItemVariety] = useState([]);
    let [price, setPrice] = useState(defaultPrice);
    let [mergeID, setMergeID] = useState(item.itemID);

    const base64StringImage = `data:image/jpeg;base64,${item.image}`;

    useEffect(() => {
        dispatch(
            updateItem({
                mergeID: mergeID,
                itemVarieties: itemVariety,
                itemPrice: price,
            }),
        );
    }, [itemVariety, price, mergeID]);

    useEffect(() => {
        if (tempItems <= 0) {
            handleIncrease();
        }
    }, []);
    const handleIncrease = () => {
        // if (
        //     tempItems.length > 0 &&
        //     hasRequiredVarieties &&
        //     itemVariety.length === 0
        // ) {
        //     alert('Variety is Required');
        // } else {
        const tempCartItem = {
            ...item,
            mergeID: mergeID,
            itemPrice: price,
            itemVarieties: itemVariety.length > 0 ? itemVariety : [],
        };
        dispatch(addToTempCart(tempCartItem));
        // }
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
        dispatch(emptyTempCart());
        navigation.navigate('Menu');
    };

    const handleVariety = (checked, varietyPrice, subVariety) => {
        setPrice((price) => price + (checked ? varietyPrice : -varietyPrice));

        if (checked) {
            const updatedItemVarieties = [...itemVariety, subVariety];
            setItemVariety(updatedItemVarieties);
            const updateMergeID = updatedItemVarieties
                .map((sv) => `${item.itemID}_${sv.subVarietyID}`)
                .join('.');
            setMergeID(updateMergeID);
        } else {
            const updatedItemsVariety = itemVariety.filter(
                (itemVariety) => itemVariety !== subVariety,
            );
            setItemVariety(updatedItemsVariety);
            const filteredMergeID = updatedItemsVariety
                .map((sv) => `${item.itemID}_${sv.subVarietyID}`)
                .join('.');
            setMergeID(filteredMergeID);
        }
    };

    const handleAddToCart = () => {
        if (
            tempItems.length > 0 &&
            hasRequiredVarieties &&
            itemVariety.length === 0
        ) {
            alert('Variety is Required');
        } else {
            dispatch(addTempCartToCart(tempItems));
            dispatch(emptyTempCart());

            navigation.navigate('Cart');
        }
    };

    const hasRequiredVarieties = item.itemVarieties.some(
        (v) => v.variety.isRequired,
    );

    const handleRowClick = (index) => {
        const updatedVarieties = [...itemVariety];
        updatedVarieties[index] = {
            ...updatedVarieties[index],
            checked: true,
        };
        setItemVariety(updatedVarieties);

        const updateMergeID = updatedVarieties
            .map((sv) => `${item.itemID}_${sv.subVarietyID}`)
            .join('.');
        setMergeID(updateMergeID);
    };

    return (
        <SafeAreaView style={styles.wrapper}>
            <ScrollView>
                <BackButton onPress={handleBack} />
                <Image
                    source={{ uri: base64StringImage }}
                    style={styles.image}
                />
                <Text style={styles.textName}>{item.itemName}</Text>
                <View style={styles.tagPrice}>
                    <Text style={styles.price}>
                        {/*Rp. {price * qty}*/}
                        Rp.{' '}
                        {item.isDiscounted
                            ? item.discountedPrice.toLocaleString()
                            : item.initialPrice.toLocaleString()}
                    </Text>

                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Button
                            disabled={tempItems.length <= 1}
                            onPress={handleDecrease}
                            title="-"
                            buttonStyle={[
                                styles.buttonStyle,
                                {
                                    backgroundColor:
                                        tempItems.length <= 1
                                            ? '#fff'
                                            : Color.primary,
                                    borderColor:
                                        tempItems.length <= 1
                                            ? Color.primary
                                            : Color.primary,
                                    borderWidth: tempItems.length <= 1 ? 2 : 0,
                                },
                            ]}
                            titleStyle={{
                                fontWeight: 'bold',
                                color:
                                    tempItems.length <= 1
                                        ? Color.primary
                                        : '#fff',
                                fontSize: tempItems.length <= 1 ? 20 : 20,
                            }}
                        />
                        <Text style={styles.count}>{tempItems.length}</Text>
                        <Button
                            onPress={handleIncrease}
                            title="+"
                            buttonStyle={[
                                styles.buttonStyle,
                                {
                                    backgroundColor: Color.primary,
                                },
                            ]}
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
                                {v.variety.isRequired
                                    ? v.variety.varietySubVarieties.map(
                                          (s, idx) => {
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
                                                              style={[
                                                                  styles.textNameVariety,
                                                                  {
                                                                      color:
                                                                          s
                                                                              .subVariety
                                                                              .subVarStock <=
                                                                          0
                                                                              ? 'rgba(0,0,0,0.5)'
                                                                              : '#000',
                                                                  },
                                                              ]}
                                                          >
                                                              {
                                                                  s.subVariety
                                                                      .subVarName
                                                              }
                                                          </Text>
                                                      </View>
                                                      <View
                                                          style={
                                                              styles.wrapperPrice
                                                          }
                                                      >
                                                          <Text
                                                              style={
                                                                  styles.textPrice
                                                              }
                                                          >
                                                              + Rp{' '}
                                                              {s.subVariety.subVarPrice.toLocaleString()}
                                                          </Text>
                                                      </View>
                                                      <View
                                                          style={
                                                              styles.roundedCheckBox
                                                          }
                                                      >
                                                          <RoundedCheckbox
                                                              text={''}
                                                              checkedColor={
                                                                  Color.primary
                                                              }
                                                              uncheckedColor="#fff"
                                                              outerStyle={[
                                                                  styles.styleCheckBox,
                                                                  {
                                                                      display:
                                                                          s
                                                                              .subVariety
                                                                              .subVarStock <=
                                                                              0 ||
                                                                          tempItems <=
                                                                              0
                                                                              ? 'none'
                                                                              : undefined,
                                                                  },
                                                              ]}
                                                              innerStyle={
                                                                  styles.styleCheckBox
                                                              }
                                                              onPress={(
                                                                  checked,
                                                              ) =>
                                                                  handleVariety(
                                                                      checked,
                                                                      s
                                                                          .subVariety
                                                                          .subVarPrice,
                                                                      s.subVariety,
                                                                      s.subVarStock,
                                                                  )
                                                              }
                                                          />
                                                      </View>
                                                  </View>
                                              );
                                          },
                                      )
                                    : v.variety.varietySubVarieties.map(
                                          (s, idx) => {
                                              return (
                                                  <TouchableOpacity
                                                      key={idx}
                                                      onPress={() =>
                                                          handleRowClick(idx)
                                                      } // Tambahkan onPress handler untuk setiap baris
                                                  >
                                                      <View
                                                          style={
                                                              styles.lineVariety
                                                          }
                                                      >
                                                          <View
                                                              style={
                                                                  styles.wrapperNameVariaety
                                                              }
                                                          >
                                                              <Text
                                                                  style={[
                                                                      styles.textNameVariety,
                                                                      {
                                                                          color:
                                                                              s
                                                                                  .subVariety
                                                                                  .subVarStock <=
                                                                                  0 ||
                                                                              tempItems <=
                                                                                  0
                                                                                  ? 'rgba(0,0,0,0.5)'
                                                                                  : '#000',
                                                                      },
                                                                  ]}
                                                              >
                                                                  {
                                                                      s
                                                                          .subVariety
                                                                          .subVarName
                                                                  }
                                                              </Text>
                                                          </View>
                                                          <View
                                                              style={
                                                                  styles.wrapperPrice
                                                              }
                                                          >
                                                              <Text
                                                                  style={
                                                                      styles.textPrice
                                                                  }
                                                              >
                                                                  + Rp{' '}
                                                                  {s.subVariety.subVarPrice.toLocaleString()}
                                                              </Text>
                                                          </View>
                                                          <View
                                                              style={
                                                                  styles.roundedCheckBox
                                                              }
                                                          >
                                                              <RoundedCheckbox
                                                                  text={''}
                                                                  checkedColor={
                                                                      Color.primary
                                                                  }
                                                                  uncheckedColor="#fff"
                                                                  outerStyle={[
                                                                      styles.styleCheckBox,
                                                                      {
                                                                          display:
                                                                              s
                                                                                  .subVariety
                                                                                  .subVarStock <=
                                                                                  0 ||
                                                                              tempItems.length <=
                                                                                  0
                                                                                  ? 'none'
                                                                                  : undefined,
                                                                      },
                                                                  ]}
                                                                  innerStyle={
                                                                      styles.styleCheckBox
                                                                  }
                                                                  checked={itemVariety.some(
                                                                      (
                                                                          variety,
                                                                      ) =>
                                                                          variety.subVarietyID ===
                                                                              s
                                                                                  .subVariety
                                                                                  .subVarietyID &&
                                                                          variety.checked,
                                                                  )}
                                                                  onPress={(
                                                                      checked,
                                                                  ) =>
                                                                      handleVariety(
                                                                          checked,
                                                                          s
                                                                              .subVariety
                                                                              .subVarPrice,
                                                                          s.subVariety,
                                                                          s.subVarStock,
                                                                          idx,
                                                                      )
                                                                  }
                                                              />
                                                          </View>
                                                      </View>
                                                  </TouchableOpacity>
                                              );
                                          },
                                      )}
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
    image: {
        marginTop: '2%',
        width: '90%',
        height: 206,
        marginHorizontal: '5%',
        borderRadius: 10,
    },
    textName: {
        marginTop: 10,
        fontWeight: '900',
        fontSize: 24,
        marginHorizontal: '5%',
    },
    tagPrice: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '5%',
    },
    price: {
        marginTop: 10,
        fontWeight: '400',
        fontSize: 20,
        marginHorizontal: '5%',
    },
    buttonStyle: {
        width: 36,
        height: 36,
        borderRadius: 36 / 2,
    },
    count: {
        fontSize: 16,
        fontWeight: '900',
        marginTop: '5%',
        marginHorizontal: '8%',
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
