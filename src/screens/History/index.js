import React, { useState } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Image,
    SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OrderScreen from './OrderScreen';
import PaymentScreen from './PaymentScreen';
import TopUpScreen from './TopUpScreen';
import { useSelector } from 'react-redux';

const History = ({ navigation }) => {
    const users = useSelector((state) => state.user.users);
    const [activeButton, setActiveButton] = useState('button1');
    const handleBack = () => {
        navigation.goBack();
    };

    const handleButtonPress = (buttonName) => {
        setActiveButton(buttonName);
    };

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
        <SafeAreaView>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: -60,
                }}
            >
                <TouchableOpacity style={styles.button} onPress={handleBack}>
                    <Image
                        source={require('../../../assets/images/button.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text
                        style={{
                            textAlign: 'center',
                            marginTop: 20,
                            fontSize: 16,
                        }}
                    >
                        History
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Image
                        source={{
                            uri: `data:image/jpeg;base64,${users.profilePhoto}`,
                        }}
                        style={styles.imageStyle}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => handleButtonPress('button1')}
                    style={[
                        styles.button,
                        {
                            backgroundColor:
                                activeButton === 'button1'
                                    ? 'orange'
                                    : 'transparent',
                        },
                    ]}
                >
                    <Text style={styles.font}>Order</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleButtonPress('button2')}
                    style={[
                        styles.button,
                        {
                            backgroundColor:
                                activeButton === 'button2'
                                    ? 'orange'
                                    : 'transparent',
                        },
                    ]}
                >
                    <Text style={styles.font}>Top Up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleButtonPress('button3')}
                    style={[
                        styles.button,
                        {
                            backgroundColor:
                                activeButton === 'button3'
                                    ? 'orange'
                                    : 'transparent',
                        },
                    ]}
                >
                    <Text style={styles.font}>Payment</Text>
                </TouchableOpacity>
            </View>
            <View style={{ margin: 40 }}>{selectedComponent}</View>
        </SafeAreaView>
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
        padding: '1%',
        margin: '5%',
        height: '50%',
        borderRadius: 30,
    },
    imageStyle: {
        flex: 1,
        padding: 10,
        margin: 20,
        borderRadius: 10,
    },

    font: {
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 16,
    },

    buttonImage: {
        position: 'absolute',
        top: 20,
    },
});

export default History;
