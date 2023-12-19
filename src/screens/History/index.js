import React, { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import OrderScreen from "./OrderScreen";
import PaymentScreen from "./PaymentScreen";
import TopUpScreen from "./TopUpScreen";

const History = () => {
    const [activeButton, setActiveButton] = useState(null);

    const handleButtonPress = (buttonName) => {
        setActiveButton(buttonName);
    };

    const navigation = useNavigation();

    let selectedComponent;

    switch (activeButton) {
        case 'button1':
            selectedComponent = <OrderScreen />;
            break;
        case 'button2':
            selectedComponent = <TopUpScreen />;
            break;
        case 'button3':
            selectedComponent = <PaymentScreen />;
            break;
        default:
            selectedComponent = <OrderScreen />;
            break;
    }

    return (
        <View>
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
                        History
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Image source={require('../../assets/images/userimage.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => handleButtonPress('button1')}
                    style={[
                        styles.button,
                        { backgroundColor: activeButton === 'button1' ? 'orange' : 'transparent' },
                    ]}
                >
                    <Text style={styles.font}>Order</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleButtonPress('button2')}
                    style={[
                        styles.button,
                        { backgroundColor: activeButton === 'button2' ? 'orange' : 'transparent' },
                    ]}
                >
                    <Text style={styles.font}>Top Up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleButtonPress('button3')}
                    style={[
                        styles.button,
                        { backgroundColor: activeButton === 'button3' ? 'orange' : 'transparent' },
                    ]}
                >
                    <Text style={styles.font}>Payment</Text>
                </TouchableOpacity>
            </View>
            <View style={{margin:40}}>
                {selectedComponent}
            </View>
        </View>
    );
};

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

export default History;
