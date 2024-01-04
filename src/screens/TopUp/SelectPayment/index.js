import {
    Animated,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import BackButton from '../../../components/backButton';
import { theme } from '../../../theme';
import { useSelector } from 'react-redux';
import * as Clipboard from 'expo-clipboard';

function SelectPayment({ navigation }) {
    const { users } = useSelector((state) => state.user);
    const [vaNumber, setVANumber] = useState('');
    const [bottomAnim] = useState(new Animated.Value(-100));
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (users.phoneNumber) {
            const newNumber = users.phoneNumber.replace(/^\+62/, '12340');
            setVANumber(newNumber);
        }

        if (visible) {
            Animated.timing(bottomAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start();

            setTimeout(() => {
                setVisible(false);
                bottomAnim.setValue(-100);
            }, 2000);
        }
    }, [visible, bottomAnim]);

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(vaNumber);
        setVisible(true);
    };

    const handleBack = () => {
        navigation.goBack();
    };

    const renderHeader = () => {
        return (
            <View>
                <Image
                    source={require('../../../assets/images/bg-image-1.png')}
                    style={styles.imageLeftContainer}
                />
                <Image
                    source={require('../../../assets/images/bg-image-2.png')}
                    style={styles.imageRightContainer}
                />
                <BackButton onPress={handleBack} />
                <View style={styles.titleHeader}>
                    <Text style={styles.title}>Payment</Text>
                </View>
            </View>
        );
    };

    const renderPayment = () => {
        return (
            <View>
                <View style={styles.sectionContainer}>
                    <Image
                        source={require('../../../assets/images/danamon.png')}
                        style={styles.imageSection}
                    />
                    <Text style={styles.titleSection}>
                        Danamon Virtual Account
                    </Text>
                </View>

                <View style={styles.paymentContainer}>
                    <View>
                        <Text style={styles.methodPayment}>Payment Method</Text>
                        <Text style={styles.bankPayment}>
                            Danamon Virtual Account
                        </Text>
                    </View>
                    <View>
                        <Image
                            source={require('../../../assets/images/danamon.png')}
                            style={styles.imageSection}
                        />
                    </View>
                </View>
                <View style={styles.paymentContainer}>
                    <View>
                        <Text style={styles.methodPayment}>
                            Virtual Account Number
                        </Text>
                        <Text style={styles.bankPayment}>{vaNumber}</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={copyToClipboard}>
                            <Image
                                source={require('../../../assets/icons/copy.png')}
                                style={styles.imagePayment}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    const renderInstructionTransfer = () => {
        return (
            <View style={styles.instructionSection}>
                <Text style={styles.bankPayment}>Petunjuk Transfer</Text>
                <View style={styles.instructionContainer}>
                    <View style={styles.wrapper}>
                        <Text style={styles.stepInstruction}>1. </Text>
                        <Text style={styles.stepInstruction}>
                            Login ke D-Bank Pro. Pilih{' '}
                            <Text style={styles.stepBold}>Top-Up E-Wallet</Text>
                            .
                        </Text>
                    </View>
                    <View style={styles.wrapper}>
                        <Text style={styles.stepInstruction}>2. </Text>
                        <Text style={styles.stepInstruction}>
                            Pilih{' '}
                            <Text style={styles.stepBold}>
                                Penyedia Layanan: X-Food
                            </Text>
                            , dan masukkan{' '}
                            <Text style={styles.stepBold}>
                                nomor Virtual Account
                            </Text>{' '}
                            <Text style={styles.stepColor}>{vaNumber}</Text>,
                            kemudian pilih{' '}
                            <Text style={styles.stepBold}>Lanjut.</Text>
                        </Text>
                    </View>
                    <View style={styles.wrapper}>
                        <Text style={styles.stepInstruction}>3. </Text>
                        <Text style={styles.stepInstruction}>
                            Masukkan <Text style={styles.stepBold}>jumlah</Text>{' '}
                            top up X-Food yang diinginkan
                        </Text>
                    </View>
                    <View style={styles.wrapper}>
                        <Text style={styles.stepInstruction}>4. </Text>
                        <Text style={styles.stepInstruction}>
                            Periksa informasi yang tertera di layar. Pastikan
                            Merchant dan Username sesuai. Jika telah sesuai,
                            masukkan PIN Anda dan pilih{' '}
                            <Text style={styles.stepBold}>OK</Text>
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    const renderPopup = () => {
        return (
            <View>
                {visible && (
                    <Animated.View
                        style={[
                            styles.popupContainer,
                            {
                                bottom: bottomAnim,
                            },
                        ]}
                    >
                        <Text style={styles.popupText}>
                            Copied to Clipboard
                        </Text>
                    </Animated.View>
                )}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                {renderHeader()}
                {renderPayment()}
                <View style={styles.line}></View>
                {renderInstructionTransfer()}
                {renderPopup()}
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
    imageRightContainer: {
        position: 'absolute',
        width: 77,
        height: 72,
        top: 0,
        right: 0,
    },
    imageLeftContainer: {
        position: 'absolute',
        width: 50,
        height: 75,
        top: 0,
        left: 0,
    },
    titleHeader: {
        alignItems: 'center',
    },
    title: {
        marginTop: 45,
        fontWeight: '500',
        fontSize: 18,
    },
    sectionContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 38,
    },
    imageSection: {
        width: 48,
        height: 48,
    },
    titleSection: {
        fontSize: 14,
        fontWeight: '400',
        marginLeft: 16,
    },
    paymentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 24,
        borderBottomWidth: 1,
        borderColor: '#F2F2F2',
    },
    methodPayment: {
        color: '#9B9B9B',
        fontSize: 12,
        fontWeight: '500',
        marginTop: 16,
        marginBottom: 8,
    },
    bankPayment: {
        fontSize: 14,
        fontWeight: '400',
        marginBottom: 16,
    },
    imagePayment: {
        width: 24,
        height: 24,
    },
    wrapper: {
        flexDirection: 'row',
    },
    line: {
        backgroundColor: '#F2F2F2',
        height: 17,
    },
    instructionSection: {
        marginVertical: 11,
        marginHorizontal: 24,
    },
    instructionContainer: {
        borderTopWidth: 1,
        borderColor: '#F2F2F2',
    },
    stepInstruction: {
        fontSize: 14,
        fontWeight: '400',
        marginTop: 17,
    },
    stepBold: {
        fontWeight: '700',
    },
    stepColor: {
        color: theme.secondary,
    },
    popupContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -100,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 70,
        borderRadius: 12,
    },
    popupText: {
        color: 'white',
    },
});

export default SelectPayment;
