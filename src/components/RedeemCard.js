import {Image, StyleSheet, Text, TouchableOpacity, View, Button, Pressable} from "react-native";
import React, {useEffect, useState} from "react";
import { format } from 'date-fns';
import VoucherService from "../services/VoucherService";
import PromotionService from "../services/PromotionService";
import {theme} from "../theme";


const RedeemCard = ({image,items, title, percenOff, vouchersLeft, expired, points, isMaxRedeemed, promotionID, accountID, voucherEmpty,onRedeemPress}) => {
    console.log("Vouchers Left for Promotion ID", promotionID, ":", vouchersLeft);
    console.log("voucher empty",voucherEmpty);
    console.log("is max redeem", isMaxRedeemed)
    const formattedExpiredDate = format(new Date(expired), 'yyyy/MM/dd');
    const handleRedeem = async () => {
        try {

            const voucherService = VoucherService();
            await voucherService.createVoucher(promotionID, accountID);
            console.log('Voucher redeemed successfully!');
        } catch (error) {
            alert("Vouchers empty or your point not enough !!");
            console.error('Error redeeming voucher:', error);

        }
    };

    const handleRedeemAndFetchVoucher = async () => {
        await handleRedeem();
        onRedeemPress();
    };

    return (
        <>
            <View style={styles.card}>
                <View style={{flexDirection:"row"}}>
                    <View style={{marginTop:5}}>
                        <View style={styles.image}>
                            <Image source={image}/>
                        </View>
                        <Text style={{marginTop:-36, fontSize:13}}>Vouchers Left : {vouchersLeft}</Text>
                        <Text style={{marginTop:30, fontSize:11}}>Expired Date:{formattedExpiredDate}</Text>
                    </View>
                    <View style={{flexDirection:"row", marginLeft:-40, marginTop:10}}>
                        <View>
                            <Text style={{fontSize:12, color:'#9796A1'}}>{percenOff}% Off</Text>
                            <Text style={{fontWeight:900, fontSize:16}}>{title}</Text>
                        </View>
                        <Text style={{marginLeft:20, fontSize:12, color:'#9796A1'}}>{items} Items</Text>
                        <Text style={{marginLeft:60, color:'#4EE476'}}>{points}</Text>
                    </View>
                    <TouchableOpacity style={{marginTop:80, marginLeft:120, position: 'absolute'}} onPress={handleRedeemAndFetchVoucher}>
                        {isMaxRedeemed || voucherEmpty ?
                            <View style={[styles.button, {backgroundColor: theme.grey}]}>
                                <Text style={{textAlign:"center", color:"white"}}>Redeem</Text>
                            </View>
                            :
                            <View style={[styles.button, {backgroundColor: "#F08D18"}]}>
                                <Text style={{textAlign:"center", color:"white"}}>Redeem</Text>
                            </View>
                        }
                    </TouchableOpacity>

                </View>


            </View>
        </>
    )
}

const styles = StyleSheet.create({
    card : {
        width: 323,
        height: 168 ,
        flexDirection:"row",
        marginBottom :20,
        padding :20,
        alignItems:"center",
        borderRadius: 18.214,
        backgroundColor: '#FFF',
        elevation: 5,
        shadowColor: '#D3D1D8',
        shadowOffset: {
            width: 18.214,
            height: 18.214,
        },
        shadowOpacity: 0.25,
        shadowRadius: 36.42

    },

    button: {
        flex: 1,
        padding: 10,
        margin: 20,
        borderRadius: 30,
        marginLeft:40,
        width:135,


    },
    image : {
        margin: 40,
        width: 60,
        height : 60,
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
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginTop:-2,
        marginLeft:-8
    }
})

export default RedeemCard;

