import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import VoucherService from "../services/VoucherService";
import {theme} from "../theme";
import { format } from 'date-fns';
import {useSelector} from "react-redux";



const RedeemCard = ({image, title, percenOff, vouchersLeft, expired, points, isMaxRedeemed, promotionID, accountID, voucherEmpty,onRedeemPress, maxRedeem, loyaltyPoint}) => {
    const formattedExpiredDate = format(new Date(expired), 'yyyy/MM/dd');
    const isExpired = new Date(expired) < new Date();
    const { users } = useSelector((state) => state.user);

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
                            <Image source={{ uri: `data:image/jpeg;base64,${image}` }}/>
                        </View>
                        <Text style={{marginTop:-36, fontSize:13}}>Vouchers Left : {vouchersLeft}</Text>
                        <Text style={{marginTop:30, fontSize:11}}>Expired Date:{formattedExpiredDate}</Text>
                    </View>
                    <View>
                    <View style={{flexDirection:"row", marginLeft:-40, marginTop:10}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:12, color:'#9796A1'}}>{percenOff} Off</Text>
                            <Text style={{marginLeft:20, fontSize:12, color:'#9796A1'}}>{maxRedeem} Items</Text>
                        </View>
                            <Text style={{marginLeft:60, color:'#4EE476'}}>{points}</Text>
                    </View>
                        <Text style={{fontWeight:900, fontSize:16, marginLeft:-40}}>{title}</Text>
                    </View>
                    {isMaxRedeemed || voucherEmpty || vouchersLeft==='0' || isExpired || loyaltyPoint < points ?
                        <TouchableOpacity style={{marginTop:80, marginLeft:120, position: 'absolute'}} onPress={handleRedeemAndFetchVoucher} disabled={true}>
                            <View style={[styles.button, {backgroundColor: theme.grey}]}>
                                <Text style={{textAlign:"center", color:"white"}}>{isExpired?`Expired`: `Redeemed`}</Text>
                            </View>
                        </TouchableOpacity> :
                        <TouchableOpacity style={{marginTop:80, marginLeft:120, position: 'absolute'}} onPress={handleRedeemAndFetchVoucher} disabled={false}>
                            <View style={[styles.button, {backgroundColor: "#F08D18"}]}>
                                <Text style={{textAlign:"center", color:"white"}}>Redeem</Text>
                            </View>
                        </TouchableOpacity>
                    }
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

