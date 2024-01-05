import {Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator} from "react-native";
import React, { useState, useEffect } from "react";
import RedeemCard from "../../components/RedeemCard";
import Starbuck from "../../../assets/images/starbuck.png";
import PromotionService from "../../services/PromotionService";
import UserService from "../../services/UserService";
import {useSelector} from "react-redux";
import VoucherService from "../../services/VoucherService";


const Redeem = () => {
    const phoneNumber = useSelector((state) => state.ui.phoneNumber);
    const promotionService = PromotionService();
    const voucherService = VoucherService();
    const [promotions, setPromotions] = useState([]);
    const userService = UserService();
    const [id, setId] = useState("");
    const [isMaxRedeemed, setIsMaxRedeemed] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [vouchersLeftData, setVouchersLeftData] = useState({});
    const [isVoucherEmpty, setIsVoucherEmpty] = useState({});

    const getAllPromotions = async () => {
        console.log("Manggil getAllPromotions");
        try {
            setIsLoading(true)
            console.log("=====>",isLoading)
            const userData = await promotionService.getPromotions();
            const fetchedPromotions = userData.data;

            setPromotions(fetchedPromotions);

            setVouchersLeftData((prevData) => {
                const newData = {};
                fetchedPromotions.forEach((promotion) => {
                    newData[promotion.promotionID] = promotion.quantity;
                });
                return newData;
            });

            const promises = fetchedPromotions.map(async (promotion) => {
                const voucher = await voucherService.getVoucherByAccountIDAndPromoID(id, promotion.promotionID);

                setIsMaxRedeemed((prev) => ({
                    ...prev,
                    [promotion.promotionID]: promotion.maxRedeem <= voucher.data.length,
                }));

                setIsVoucherEmpty((prev) => ({
                    ...prev,
                    [promotion.promotionID]: promotion.vouchersLeft <= 0,
                }));
            });

            await Promise.all(promises);
            setIsLoading(false);
            console.log("====+>", isLoading)
        } catch (error) {
            console.error('Error fetching user data:', error);
            alert("Vouchers empty or your point not enough !!");

        }
    };

    const fetchUserData = async (phoneNumber) => {
        try {
            const userData = await userService.fetchUserByPhoneNumber(phoneNumber);
            const accountID = userData.data.accountID;
            setId(accountID);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleRedeemPress = async (promotionID) => {

        setVouchersLeftData((prevData) => {
            const newData = { ...prevData };
            newData[promotionID] = newData[promotionID] - 1;

            if (newData[promotionID] < 0) {
                newData[promotionID] = 0;
            }

            return newData;
        });

    };



    useEffect(() => {
        fetchUserData(phoneNumber);
    }, [phoneNumber]);

    useEffect(() => {
        if (id !== "") {
            getAllPromotions();
        }
    }, [id]);

    return (
        <>
            {isLoading && (
                <ActivityIndicator
                    style={{
                        position: 'absolute',
                        zIndex: 2,
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    }}
                    size="large"
                    color= '#FFC529'
                />
            )}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: -60,
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
            <View style={{margin:20, display:'flex', justifyContent:'center', alignItems:'center', marginBottom:50}}>
                <ScrollView style={{marginBottom:50}}>
                    {promotions.map((promotion) => (
                        <RedeemCard
                            key={promotion.promotionID}
                            image={Starbuck}
                            vouchersLeft={vouchersLeftData[promotion.promotionID] ? vouchersLeftData[promotion.promotionID].toString() : '0'}
                            points={promotion.cost.toString()}
                            items={promotion.quantity.toString()}
                            expired={promotion.expiredDate}
                            title={promotion.promotionName}
                            isMaxRedeemed={isMaxRedeemed[promotion.promotionID] || false}
                            voucherEmpty={isVoucherEmpty[promotion.promotionID] || false}
                            percenOff={promotion.promotionValue.toString()}
                            accountID={id}
                            promotionID={promotion.promotionID}
                            onRedeemPress={() => handleRedeemPress(promotion.promotionID)}
                        />
                    ))}

                </ScrollView>
            </View>
        </>
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