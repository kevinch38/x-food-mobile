import {Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {theme} from "../../theme";
import {useNavigation, useRoute} from "@react-navigation/native";
import {formatIDRCurrency} from "../../utils/utils";
import React from "react";

const TopUpDetail = () => {
    const route = useRoute();
    const {amount} = route?.params;
    const navigation = useNavigation();
    const handleBack = () => {
        navigation.goBack();
    }
    return(
        <View>
            <TouchableOpacity style={styles.buttonImage} onPress={()=>handleBack()}>
                <Image source={require('../../../assets/images/button.png')} />
            </TouchableOpacity>
            <View style={styles.imageController}>

                <Image
                    style={styles.imageHeader}
                    source={require('../../assets/icons/confirm-icon.png')}
                />
                <Text style={styles.title}>
                    Top Up Success
                </Text>
                <Text style={styles.subTitle}>
                    {formatIDRCurrency(amount)} was added From Bank Danamon
                </Text>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    controller: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#fff',
    },
    imageController: {
        marginTop: '50%',
        alignItems: 'center',
    },
    imageHeader: {
        width: 150,
        height: 150,
        marginTop: 46,
        marginBottom: 44,
    },
    title: {
        width: '80%',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom:"10%"
    },
    subTitle: {
        width: '60%',
        textAlign: 'center',
        marginTop: '5%',
        fontWeight: '300',
        fontSize: 20,
    },
    points: {
        width: '60%',
        textAlign: 'center',
        marginTop: '5%',
        fontWeight: '300',
        fontSize: 15,
    },
    inputPin: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    textInputStyle: {
        width: 54,
        height: 54,
        borderColor: theme.grey,
        borderWidth: 1,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 27,
        fontWeight: '500',
        color: theme.primary,
        marginTop: 62,
    },
    textForgotPin: {
        color: theme.primary,
        fontSize: 16,
        fontWeight: '600',
    },

    buttonImage: {
        position: 'absolute',
        top: 30,
        left:30
    },
});


export default TopUpDetail;