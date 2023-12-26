import {
    Image,
    SafeAreaView,
    SectionList,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import BackButton from '../../components/backButton';
import React from 'react';

function TopUp({ navigation }) {
    const handleBack = () => {
        navigation.goBack();
    };

    const handlePayment = () => {
        navigation.navigate('SelectPayment');
    };

    const data = [
        {
            title: 'Virtual Account',
            data: [
                {
                    image: require('../../assets/images/danamon.png'),
                    title: 'Danamon Virtual Account',
                },
                {
                    image: require('../../assets/images/mandiri.png'),
                    title: 'Mandiri Virtual Account',
                },
                {
                    image: require('../../assets/images/bni.png'),
                    title: 'BNI Virtual Account',
                },
                {
                    image: require('../../assets/images/bca.png'),
                    title: 'BCA Virtual Account',
                },
            ],
        },
        {
            title: 'Credit Card / Debit',
            data: [
                {
                    image: require('../../assets/images/cc.png'),
                    title: 'Credit / Debit',
                },
            ],
        },
    ];

    const renderHeader = () => {
        return (
            <View>
                <Image
                    source={require('../../assets/images/bg-image-1.png')}
                    style={styles.imageLeftContainer}
                />
                <Image
                    source={require('../../assets/images/bg-image-2.png')}
                    style={styles.imageRightContainer}
                />
                <BackButton onPress={handleBack} />
                <View style={styles.titleHeader}>
                    <Text style={styles.title}>Select Payment</Text>
                </View>
            </View>
        );
    };

    const renderVA = () => {
        return (
            <View style={styles.sectionContainer}>
                <View>
                    <SectionList
                        sections={data}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={handlePayment}>
                                <View style={styles.sectionData}>
                                    <Image
                                        source={item.image}
                                        style={styles.dataImage}
                                    />
                                    <Text style={styles.dataTitle}>
                                        {item.title}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        renderSectionHeader={({ section: { title } }) => (
                            <View style={styles.titleContainer}>
                                <Text style={styles.sectionTitle}>{title}</Text>
                            </View>
                        )}
                    />
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                {renderHeader()}
                {renderVA()}
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
        marginBottom: 16,
    },
    title: {
        marginTop: 45,
        fontWeight: '500',
        fontSize: 18,
    },
    sectionContainer: {
        marginTop: 28,
    },
    titleContainer: {
        backgroundColor: '#F2F2F2',
        justifyContent: 'center',
    },
    sectionTitle: {
        paddingVertical: 11,
        paddingHorizontal: 16,
        fontSize: 14,
        fontWeight: '500',
    },
    sectionData: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginVertical: 8,
        borderBottomWidth: 1,
        borderColor: '#F2F2F2',
    },
    dataImage: {
        width: 48,
        height: 48,
    },
    dataTitle: {
        marginLeft: 16,
        fontWeight: '400',
        fontSize: 14,
    },
});

export default TopUp;
