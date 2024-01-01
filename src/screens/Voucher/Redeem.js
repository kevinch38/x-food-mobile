import {Image, StyleSheet, Text, TouchableOpacity, View, ScrollView} from "react-native";
import React, { useState, useEffect } from "react";
import RedeemCard from "../../components/RedeemCard";
import Starbuck from "../../../assets/images/starbuck.png";
import PromotionService from "../../services/PromotionService";


const Redeem = () => {
    const promotionService = PromotionService();
    const [promotions, setPromotions] = useState([]);
    const getAllPromotions = async () => {
        try {
            const userData = await promotionService.getPromotions();
            setPromotions(userData.data);
            console.log('userData:', userData);

        } catch (error) {
            console.error('Error fetching user data1:', error);
        }
    };

    useEffect(() => {
        getAllPromotions();
    }, []);
    return (
        <>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: -60,
                    // marginBottom:-100
                }}
            >
                <TouchableOpacity style={styles.button}>
                    <Image source={require('../../../assets/images/button.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 16 }}>
                        Redeem
                    </Text>
                </TouchableOpacity>

                <View style={{flexDirection:'row', marginTop:10, marginRight:20, padding:10}}>
                    <Image source={require('../../assets/icons/Coin.png')}/>
                    <Text style={{ marginTop:30, marginLeft:-20, fontSize:16}}>
                        980
                    </Text>
                </View>

            </View>
            <View style={{margin:20, display:'flex', justifyContent:'center', alignItems:'center'}}>
                <ScrollView>
                    {promotions.map((promotion) => (
                        <RedeemCard
                            key={promotion.promotionID}
                            image={Starbuck}
                            vouchersLeft={promotion.quantity.toString()}
                            points={promotion.cost.toString()}
                            items={promotion.maxRedeem.toString()}
                            expired={promotion.expiredDate}
                            title={promotion.promotionName}
                            percenOff={promotion.promotionValue.toString()}
                        />
                    ))}
                </ScrollView>
            </View>


        </>




        // <View>
        // </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    button: {
        flex: 1,
        padding: 10,
        margin: 20,
        borderRadius: 30,
    },

    font: {
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
        fontSize: 16,
    },

    buttonImage: {
        position: 'absolute',
        top: 20,
    },
});

export default Redeem;