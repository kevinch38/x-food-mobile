import {Text, View, StyleSheet, Image} from "react-native";
import React from "react";

const HistoryCard = () => {
    return(
        <>
        <View style={styles.card}>
            <View style={styles.image}>
                <Image
                    source={require('../assets/images/topupimage.png')}
                />
            </View>
            <View style={{flexDirection:"column", justifyContent:"center", marginLeft:10}}>
                <Text style={{fontWeight:400, color:'#9796A1', fontSize:12}}>16 Oct, 10:00</Text>
                <Text style={{fontWeight:900, fontSize:16}}>Top Up</Text>
                <Text style={{fontWeight:500, fontSize:15}}>Top Up Success 50,000</Text>
            </View>

        </View>
        {/*<View style={styles.card}>*/}
        {/*    <View style={styles.image}>*/}
        {/*        <Image*/}
        {/*            source={require('../assets/images/topupimage.png')}*/}
        {/*        />*/}
        {/*    </View>*/}
        {/*    <View style={{flexDirection:"column", justifyContent:"center", marginLeft:10}}>*/}
        {/*        <Text style={{fontWeight:400, color:'#9796A1', fontSize:12}}>16 Oct, 10:00</Text>*/}
        {/*        <Text style={{fontWeight:900, fontSize:16}}>Top Up</Text>*/}
        {/*        <Text style={{fontWeight:500, fontSize:15}}>Top Up Success 50,000</Text>*/}
        {/*    </View>*/}

        {/*</View>*/}
        </>

    )
}

const styles = StyleSheet.create({
    card : {
        width: 316,
        height: 109,
        flexDirection:"row",
        marginBottom :20,
        padding :20,
        alignItems:"center",
        borderRadius: 18.214,
        backgroundColor: '#FFF',
        elevation: 20, // Untuk bayangan di Android, atur sesuai kebutuhan
        shadowColor: '#D3D1D8', // Warna bayangan pada iOS
        shadowOffset: {
            width: 18.214,
            height: 18.214,
        },
        shadowOpacity: 0.25,
        shadowRadius: 36.42

    },
    image : {
        margin: 10,
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
        shadowRadius: 36.42
    }
})

export default HistoryCard
