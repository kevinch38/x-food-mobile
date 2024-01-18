import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import BackButton from '../../components/backButton';
import { useRoute } from '@react-navigation/native';
import { selectedMerchantAction } from '../../slices/merchantSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ServiceContext } from '../../context/ServiceContext';
import CardBranch from '../../components/card/CardBranch';
import Loading from '../../components/loading';

const Merchant = ({ navigation }) => {
    const dispatch = useDispatch();
    const merchant = useSelector((state) => state.merchant.selectedMerchant);
    const { merchantService, merchantBranchService } =
        useContext(ServiceContext);
    const route = useRoute();
    const receivedId = route.params?.id;
    const [branches, setBranches] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const handleBack = () => {
        navigation.navigate('Tabs');
    };
    const handleToMenu = (branchId) => {
        navigation.navigate('Menu', { branchId });
    };

    useEffect(() => {
        const onGetMerchant = async () => {
            try {
                setIsLoading(true);

                await dispatch(
                    selectedMerchantAction(() =>
                        merchantService.fetchMerchantById(receivedId),
                    ),
                );

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching merchant:', error);
                setIsLoading(false);
            }
        };
        onGetMerchant();
    }, [dispatch, merchantService]);

    return (
        <SafeAreaView style={styles.wrapper}>
            {isLoading ? (
                <Loading />
            ) : (
                <ScrollView>
                    <BackButton onPress={handleBack} />
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            source={{
                                uri: `data:image/jpeg;base64,${merchant?.image}`,
                            }}
                            style={styles.bgProfile}
                        />
                    </View>
                    <View style={styles.wrapperProfile}>
                        <View style={styles.outerCircle}>
                            <View style={styles.outerInnerCircle}>
                                <Image
                                    source={{
                                        uri: `data:image/jpeg;base64,${merchant?.logoImage}`,
                                    }}
                                    style={styles.logo}
                                />
                            </View>
                            <View style={styles.wrapperCamera}>
                                <Image
                                    source={require('../../assets/images/verified.png')}
                                    style={styles.iconVerified}
                                />
                            </View>
                        </View>
                    </View>
                    <View
                        style={{ marginTop: '15%', justifyContent: 'center' }}
                    >
                        <Text
                            style={{
                                fontSize: 22,
                                fontWeight: '900',
                                textAlign: 'center',
                            }}
                        >
                            {merchant.merchantName}
                        </Text>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 13,
                                fontWeight: '300',
                            }}
                        >
                            {merchant.merchantDescription}
                            {/* itemDescription */}
                        </Text>
                    </View>

                    {Array.isArray(merchant.merchantBranches) &&
                        merchant.merchantBranches.length > 0 &&
                        merchant.merchantBranches.map((b, idx) => {
                            return (
                                <CardBranch
                                    key={idx}
                                    image={b.image}
                                    onPress={() => handleToMenu(b.branchID)}
                                    branchName={b.branchName}
                                    image={b.image}
                                    branchAddress={b.address}
                                />
                            );
                        })}
                </ScrollView>
            )}
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
    wrapperProfile: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 200,
    },
    outerCircle: {
        position: 'absolute',
        height: 108,
        width: 108,
        borderRadius: 108 / 2,
        backgroundColor: 'white',
    },
    outerInnerCircle: {
        position: 'absolute',
        height: 90,
        width: 90,
        borderRadius: 90 / 2,
        margin: 9,
        backgroundColor: '#FFC529',
    },
    logo: {
        position: 'absolute',
        height: 70,
        width: 70,
        borderRadius: 70 / 2,
        margin: 9,
    },
    wrapperCamera: {
        position: 'absolute',
        backgroundColor: 'white',
        width: 27,
        height: 27,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        right: 10,
        bottom: 2,
    },
    iconVerified: {
        width: 20,
        height: 19,
    },
    bgProfile: {
        marginTop: -35,
        resizeMode: 'contain',
        width: 378,
        height: 285,
        position: 'absolute',
    },
});

export default Merchant;
