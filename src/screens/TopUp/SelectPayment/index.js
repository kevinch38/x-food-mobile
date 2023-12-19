import {
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React from 'react';
import BackButton from '../../../components/backButton';
import { theme } from '../../../theme';

function SelectPayment({ navigation }) {
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
                        source={require('../../../assets/images/bca.png')}
                        style={styles.imageSection}
                    />
                    <Text style={styles.titleSection}>BCA Virtual Account</Text>
                </View>

                <View style={styles.paymentContainer}>
                    <View>
                        <Text style={styles.methodPayment}>Payment Method</Text>
                        <Text style={styles.bankPayment}>
                            BCA Virtual Account
                        </Text>
                    </View>
                    <View>
                        <Image
                            source={require('../../../assets/images/bca.png')}
                            style={styles.imageSection}
                        />
                    </View>
                </View>
                <View style={styles.paymentContainer}>
                    <View>
                        <Text style={styles.methodPayment}>
                            Virtual Account Number
                        </Text>
                        <Text style={styles.bankPayment}>117342009003596</Text>
                    </View>
                    <View>
                        <Image
                            source={require('../../../assets/icons/copy.png')}
                            style={styles.imagePayment}
                        />
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
                            Login ke mBanking-mu. Pilih{' '}
                            <Text style={styles.stepBold}>Top-Up</Text>,
                            kemudian pilih{' '}
                            <Text style={styles.stepBold}>e-Wallet</Text>.
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
                            <Text style={styles.stepColor}>
                                117342009003596
                            </Text>
                            , kemudian pilih{' '}
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

    return (
        <SafeAreaView style={styles.container}>
            <View>
                {renderHeader()}
                {renderPayment()}
                <View style={styles.line}></View>
                {renderInstructionTransfer()}
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
});

export default SelectPayment;
