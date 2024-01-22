import React, { useState } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Image,
    SafeAreaView,
} from 'react-native';
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

    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.titleHeader}>
                    <Text style={styles.title}>History</Text>
                </View>
                <View style={styles.imageHeader}>
                    <Image
                        source={{
                            uri: `data:image/jpeg;base64,${users.profilePhoto}`,
                        }}
                        style={styles.imageStyle}
                    />
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
            {renderHeader()}
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
    headerContainer: {
        marginTop: 37,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 28,
    },
    imageHeader: {
        position: 'absolute',
        right: 27,
    },
    titleHeader: {
        width: '100%',
    },
    title: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    button: {
        flex: 1,
        padding: '1%',
        margin: '6%',
        height: '50%',
        borderRadius: 30,
    },
    imageStyle: {
        height: 38,
        width: 38,
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
