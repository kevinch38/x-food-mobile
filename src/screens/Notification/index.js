import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {useNavigation} from "@react-navigation/native";
import PaymentReceipt from "../../components/paymentReceipt";

function Notification({navigation}) {


    return(
        <View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginBottom: -60,
                    marginTop:20
                }}
            >
                <TouchableOpacity style={styles.button}>
                    <Image source={require('../../../assets/images/button.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 16 }}>
                        Notification
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Image source={require('../../assets/images/userimage.png')} />
                </TouchableOpacity>
            </View>

            <View style={{margin:40}}>
                {/*{selectedComponent}*/}
                <PaymentReceipt/>
            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 12,
    },
    button: {
        flex: 1,
        padding: 5,
        margin: 20,
        borderRadius: 30,
        marginTop:20
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

export default Notification;