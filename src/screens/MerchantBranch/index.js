import {
    View,
    SafeAreaView,
    ScrollView,
    Image,
    StyleSheet,
    StatusBar,
    Text,
} from 'react-native';
import React from 'react';
import BackButton from '../../components/backButton';

const Merchant = ({ navigation }) => {
    handleBack = () => {
        navigation.navigate('Tabs');
    };
    return (
        <SafeAreaView style={styles.wrapper}>
            <ScrollView>
                <BackButton onPress={handleBack} />
                <View
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Image
                        source={require('../../assets/images/bg-merchant-page.png')}
                        style={{
                            width: '90%',
                            height: 146,
                            marginHorizontal: '5%',
                            marginTop: '5%',
                            borderRadius: 10,
                        }}
                    />
                </View>
                <View
                    style={{
                        width: 52,
                        position: 'absolute',
                        top: '40%',
                        left: '39%',
                    }}
                >
                    <Image
                        source={require('../../assets/images/bg-logo-merchant-1.png')}
                        style={{
                            width: 104,
                            height: 104,
                            position: 'relative',
                        }}
                    />
                    <Image
                        source={require('../../assets/images/bg-merchant-2.png')}
                        style={{
                            height: 90,
                            width: 90,
                            position: 'absolute',
                            top: '50%',
                        }}
                    />
                </View>
                <View style={{ marginTop: '20%', justifyContent: 'center' }}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: '900',
                            textAlign: 'center',
                        }}
                    >
                        Pizza Hut
                    </Text>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 12,
                            fontWeight: '300',
                        }}
                    >
                        Welcome to Pizza Hut, where every slice is a journey
                        into a world of mouthwatering delight! Immerse your
                        taste buds in a symphony of flavors, as our expertly
                        crafted pizzas, adorned with premium toppings
                    </Text>
                </View>
                <View
                    style={{
                        marginHorizontal: '10%',
                        marginTop: '5%',
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.5,
                        shadowRadius: 3,
                        elevation: 2,
                    }}
                >
                    <Image
                        source={require('../../assets/images/ph-kalibata.png')}
                        style={{ width: 323, height: 165 }}
                    />
                    <Text
                        style={{
                            fontSize: 18,
                            marginTop: '5%',
                            fontWeight: '900',
                        }}
                    >
                        Kalibata
                    </Text>
                    <Text style={{ fontSize: 10, fontWeight: '400' }}>
                        Jalan Buncit Raya No.2, Kalibata, Pancoran, Jakarta
                        Selatan
                    </Text>
                </View>
                <View
                    style={{
                        marginHorizontal: '10%',
                        marginTop: '5%',
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.5,
                        shadowRadius: 3,
                        elevation: 2,
                    }}
                >
                    <Image
                        source={require('../../assets/images/ph-kemang.png')}
                        style={{ width: 323, height: 165 }}
                    />
                    <Text
                        style={{
                            fontSize: 18,
                            marginTop: '5%',
                            fontWeight: '900',
                        }}
                    >
                        Kemang
                    </Text>
                    <Text style={{ fontSize: 10, fontWeight: '400' }}>
                        Jalan Sudirman No.2, Kemang, Jakarta Selatan
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        height: '100%',
        backgroundColor: '#fff',
    },
});

export default Merchant;
