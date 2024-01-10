import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Button from '../../components/button';
import React from 'react';
import * as Icon from 'react-native-feather';
import Color from '../../assets/Color';

function SplitBillAddPosition({ navigation }) {
    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.btnBack}
                    onPress={() => navigation.goBack()}
                >
                    <Icon.ChevronLeft
                        width={24}
                        height={24}
                        strokeWidth={3}
                        color={'#000'}
                    />
                </TouchableOpacity>
                <Text style={styles.titleHeader}>Add Positions</Text>
                <Image
                    source={require('../../assets/images/profile.png')}
                    style={styles.imageProfile}
                />
            </View>
        );
    };
    const renderAddPosition = () => {
        return (
            <View style={styles.addPositionContainer}>
                <TouchableOpacity style={styles.btnAdd}>
                    <Icon.UserPlus
                        width={32}
                        height={32}
                        strokeWidth={2}
                        color={Color.primary}
                    />
                </TouchableOpacity>
                <View style={styles.cardContainer}>
                    <View style={styles.avatarAddPosition}>
                        <Image
                            source={require('../../assets/images/avatar.png')}
                        />
                        <View style={styles.nameAddPosition}>
                            <Text style={styles.titleAddPosition}>
                                Add Position to
                            </Text>
                            <Text style={styles.name}>Anna</Text>
                        </View>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.item}>Mushroom Signature</Text>
                        <View style={styles.priceContainer}>
                            <Text style={styles.price}>Rp 55,000</Text>
                            <Text style={styles.price}>1x</Text>
                            <View style={styles.counterContainer}>
                                <TouchableOpacity style={styles.btnCounter}>
                                    <Icon.Minus
                                        width={16}
                                        height={16}
                                        strokeWidth={3}
                                        color={'#fff'}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.amount}>0</Text>
                                <TouchableOpacity style={styles.btnCounter}>
                                    <Icon.Plus
                                        width={16}
                                        height={16}
                                        strokeWidth={3}
                                        color={'#fff'}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.item}>Chicken Hawaiian</Text>
                        <View style={styles.priceContainer}>
                            <Text style={styles.price}>Rp 50,000</Text>
                            <Text style={styles.price}>0x</Text>
                            <View style={styles.counterContainer}>
                                <TouchableOpacity style={styles.btnCounter}>
                                    <Icon.Minus
                                        width={16}
                                        height={16}
                                        strokeWidth={3}
                                        color={'#fff'}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.amount}>0</Text>
                                <TouchableOpacity style={styles.btnCounter}>
                                    <Icon.Plus
                                        width={16}
                                        height={16}
                                        strokeWidth={3}
                                        color={'#fff'}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    };
    const renderChoiceAvatar = () => {
        return (
            <View style={styles.choiceAvatarContainer}>
                <TouchableOpacity style={styles.btnChoiceAvatar}>
                    <Image
                        source={require('../../assets/images/avatar.png')}
                        style={styles.imageChoiceAvatar}
                    />
                    <Text style={styles.nameChoiceAvatar}>Erika</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnChoiceAvatar}>
                    <Image
                        source={require('../../assets/images/avatar.png')}
                        style={styles.imageChoiceAvatar}
                    />
                    <Text style={styles.nameChoiceAvatar}>Erika</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                {renderHeader()}
                {renderAddPosition()}
            </ScrollView>
            {renderChoiceAvatar()}
            <View style={styles.btnContainer}>
                <Button
                    onPress={() => navigation.navigate('SplitBillPosition')}
                    title={'Next'}
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
        backgroundColor: '#fff',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 37,
        paddingHorizontal: 27,
    },
    btnBack: {
        width: 38,
        height: 38,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    titleHeader: {
        fontWeight: '500',
        fontSize: 18,
    },
    imageProfile: {
        height: 38,
        width: 38,
        borderRadius: 12,
    },
    addPositionContainer: {
        marginHorizontal: 27,
        marginBottom: 20,
    },
    btnAdd: {
        position: 'absolute',
        width: 31,
        height: 31,
        right: 0,
        justifyContent: 'flex-end',
    },
    cardContainer: {
        marginTop: 40,
        backgroundColor: 'rgba(255, 197, 41, 0.4)',
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    avatarAddPosition: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 26,
    },
    nameAddPosition: {
        marginLeft: 12,
    },
    titleAddPosition: {
        fontWeight: '600',
        fontSize: 15,
    },
    name: {
        fontWeight: '800',
        fontSize: 15,
    },
    itemContainer: {
        marginBottom: 40,
    },
    item: {
        fontWeight: '500',
        fontSize: 15,
        marginBottom: 10,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    price: {
        fontSize: 14,
        fontWeight: '200',
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnCounter: {
        backgroundColor: Color.primary,
        justifyContent: 'center',
        alignItems: 'center',
        width: 28,
        height: 28,
        borderRadius: 28,
    },
    amount: {
        fontWeight: '900',
        fontSize: 16,
        marginHorizontal: 8,
    },
    choiceAvatarContainer: {
        flexDirection: 'row',
        top: -50,
        justifyContent: 'center',
    },
    btnChoiceAvatar: {
        marginHorizontal: 6,
        alignItems: 'center',
    },
    imageChoiceAvatar: {
        width: 62,
        height: 62,
        marginBottom: 8,
    },
    nameChoiceAvatar: {
        fontSize: 12,
        fontWeight: '800',
    },
    btnContainer: {
        borderTopStartRadius: 24,
        borderTopEndRadius: 24,
        marginTop: -48,
        backgroundColor: '#fff',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 28,
        paddingHorizontal: 34,
    },
    buttonStyle: {
        borderRadius: 20,
        width: '100%',
    },
    titleStyle: {
        fontSize: 16,
        fontWeight: '600',
    },
});
export default SplitBillAddPosition;
