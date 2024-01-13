import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Color from '../../assets/Color';
import Button from '../../components/button';
import React from 'react';

function SplitBillSuccess({ navigation }) {
    const renderStruct = () => {
        return (
            <View>
                <View style={styles.struckContainer}>
                    <Text style={styles.ticketStruck}>Order ID #237</Text>
                    <Text style={styles.dateStruck}>April 8th, 2022</Text>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../assets/images/mechant-logo.png')}
                            style={styles.imageLogo}
                        />
                        <Text style={styles.statusOrder}>Order Completed</Text>
                    </View>
                    <View style={styles.itemOrderContainer}>
                        <View style={styles.itemOrder}>
                            <Text style={styles.item}>Mushroom Signature</Text>
                            <Text style={styles.priceTotal}>Rp 55,000</Text>
                        </View>
                        <View style={styles.priceContainer}>
                            <Text style={styles.price}>Rp 55,000</Text>
                            <Text style={styles.price}>1x</Text>
                        </View>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={require('../../assets/images/avatar.png')}
                                style={styles.avatar}
                            />
                            <Image
                                source={require('../../assets/images/avatar.png')}
                                style={styles.avatar}
                            />
                        </View>
                    </View>
                    <View style={styles.btnTrack}>
                        <Button
                            onPress={() =>
                                navigation.navigate('SplitBillTrack')
                            }
                            title={'Track'}
                            buttonStyle={styles.trackButtonStyle}
                            titleStyle={styles.trackTitleStyle}
                        />
                        <Text style={styles.textTotal}>Total:</Text>
                        <Text style={styles.priceTotal}>Rp 155,000</Text>
                    </View>
                </View>
                <View style={styles.circleContainer}>
                    <View style={[styles.circle, styles.leftCircle]} />
                    <View style={[styles.circle, styles.rightCircle]} />
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                {renderStruct()}
            </ScrollView>
            <View style={styles.btnContainer}>
                <Button
                    onPress={() => navigation.navigate('Home')}
                    title={'Done'}
                    titleStyle={styles.titleStyle}
                    buttonStyle={styles.buttonStyle}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: Color.primary,
    },
    struckContainer: {
        backgroundColor: '#fff',
        marginHorizontal: 15,
        marginVertical: 47,
        paddingHorizontal: 20,
        paddingVertical: 24,
        borderRadius: 20,
    },
    ticketStruck: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
    },
    dateStruck: {
        fontSize: 14,
        fontWeight: '400',
    },
    logoContainer: {
        marginVertical: 24,
        alignItems: 'center',
    },
    imageLogo: {
        width: 100,
        marginBottom: 16,
    },
    statusOrder: {
        fontSize: 20,
        fontWeight: '600',
    },
    itemOrderContainer: {
        marginBottom: 32,
    },
    itemOrder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    item: {
        fontSize: 16,
        fontWeight: '400',
    },
    priceTotal: {
        fontSize: 16,
        fontWeight: '600',
    },
    priceContainer: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    price: {
        fontSize: 14,
        fontWeight: '200',
        marginRight: 40,
    },
    avatarContainer: {
        flexDirection: 'row',
    },
    avatar: {
        width: 28,
        height: 28,
        marginRight: 8,
    },
    btnTrack: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    trackButtonStyle: {
        width: 100,
        height: 34,
    },
    trackTitleStyle: {
        fontSize: 16,
        fontWeight: '500',
    },
    textTotal: {
        fontSize: 20,
        fontWeight: '600',
    },
    circleContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        top: 250,
    },
    circle: {
        width: 24,
        height: 24,
        borderRadius: 24,
        backgroundColor: Color.primary,
    },
    leftCircle: {
        marginLeft: 4,
    },
    rightCircle: {
        marginRight: 4,
    },
    btnContainer: {
        marginTop: -48,
        backgroundColor: Color.primary,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 24,
        paddingBottom: 52,
        paddingHorizontal: 34,
    },
    buttonStyle: {
        borderRadius: 20,
        width: '100%',
        backgroundColor: '#34A853',
    },
    titleStyle: {
        fontSize: 16,
        fontWeight: '600',
    },
});
export default SplitBillSuccess;
