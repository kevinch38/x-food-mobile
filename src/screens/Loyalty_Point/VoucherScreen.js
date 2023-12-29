import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import VoucherCard from "../../components/VoucherCard";
import Starbuck from "../../../assets/images/starbuck.png"

const VoucherScreen = () => {
    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Image source={require('../../../assets/images/elipse3.png')} style={{ position: 'absolute', top: 0 }} />
            <Image source={require('../../../assets/images/elipse.png')} style={{ position: 'absolute', top: 0 }} />
            <TouchableOpacity style={{position:'absolute', top:20}}>
                <Image source={require('../../../assets/images/button.png')} />
            </TouchableOpacity>
            <Image source={require('../../../assets/images/elipse2.png')} style={{ position: 'absolute', top: 0, right: 0 }} />
            <Text style={{marginTop:100, fontSize:18, fontWeight:700}}>
                Points
            </Text>
            <View style={{flexDirection:"row",
                justifyContent:"space-between", alignItems:'center', marginTop:-30}}>
                <View style={{flexDirection:'row'}}>
                    <Image source={require('../../../assets/images/Coin.png')}/>
                    <Text style={{alignSelf:'center', fontSize:18}}>
                        980
                    </Text>
                </View>
                <TouchableOpacity style={{marginTop:25}}>
                    <Image source={require('../../../assets/images/redeembutton.png')} />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{fontSize:18, fontWeight:700}}>
                    My Vouchers
                </Text>
                <ScrollView>
                    <VoucherCard title={`Starbucks Rp. 30.000 Off`} content={`Some explanation of the code`} image={Starbuck} expired={`Will Expire on 25/10/2024`}/>
                    <VoucherCard title={`Starbucks Rp. 30.000 Off`} content={`Some explanation of the code`} image={Starbuck} expired={`Will Expire on 25/10/2024`}/>
                    <VoucherCard title={`Starbucks Rp. 30.000 Off`} content={`Some explanation of the code`} image={Starbuck} expired={`Will Expire on 25/10/2024`}/>
                    <VoucherCard title={`Starbucks Rp. 30.000 Off`} content={`Some explanation of the code`} image={Starbuck} expired={`Will Expire on 25/10/2024`}/>
                    <VoucherCard title={`Starbucks Rp. 30.000 Off`} content={`Some explanation of the code`} image={Starbuck} expired={`Will Expire on 25/10/2024`}/>
                    <VoucherCard title={`Starbucks Rp. 30.000 Off`} content={`Some explanation of the code`} image={Starbuck} expired={`Will Expire on 25/10/2024`}/>
                    <VoucherCard title={`Starbucks Rp. 30.000 Off`} content={`Some explanation of the code`} image={Starbuck} expired={`Will Expire on 25/10/2024`}/>
                    <VoucherCard title={`Starbucks Rp. 30.000 Off`} content={`Some explanation of the code`} image={Starbuck} expired={`Will Expire on 25/10/2024`}/>
                    <VoucherCard title={`Starbucks Rp. 30.000 Off`} content={`Some explanation of the code`} image={Starbuck} expired={`Will Expire on 25/10/2024`}/>
                </ScrollView>


            </View>
        </View>
    )

}

export default VoucherScreen

