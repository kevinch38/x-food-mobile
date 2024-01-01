import {
    View,
    SafeAreaView,
    ScrollView,
    Image,
    StyleSheet,
    StatusBar,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import BackButton from '../../components/backButton';
import Logo from '../../assets/images/mechant-logo.png';
import Verified from '../../assets/images/verified.png';
import BgMerchantBranch from '../../assets/images/bg-merchant-page.png';
import { useRoute } from '@react-navigation/native';
import { selectedMerchantAction } from '../../slices/merchantSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ServiceContext } from '../../context/ServiceContext';
import { merchantBranchAction } from '../../slices/merchantBranch';
import CardBranch from '../../components/card/CardBranch';
import Loading from '../../components/loading';

const Merchant = ({ navigation }) => {
    const dispatch = useDispatch();
    const merchant = useSelector((state) => state.merchant.selectedMerchant);
    // const branchs = useSelector((state) => state.merchantBranch.branchs);
    const { merchantService, merchantBranchService } =
        useContext(ServiceContext);
    const route = useRoute();
    const receivedId = route.params?.id;
    const cityId = route.params?.cityId;
    const [branches, setBranches] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    // const filteredBranch = branches.filter(
    //     (branch) => branch.city.cityID === cityId,
    // );

    const handleBack = () => {
        navigation.navigate('Tabs');
    };

    const handleToMenu = (branchId) => {
        navigation.navigate('Menu', { branchId });
    };

    // useEffect(() => {
    //     setBranches(merchant.merchantBranches);
    // }, [merchant.merchantBranches]);

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

    // useEffect(() => {
    //     const onGetMerchantBranch = async () => {
    //         try {
    //             setIsLoading(true);

    //             await dispatch(
    //                 merchantBranchAction(() =>
    //                     merchantBranchService.fetchMerchantBranchs(receivedId),
    //                 ),
    //             );

    //             setIsLoading(false);
    //         } catch (error) {
    //             console.error('Error fetching merchant:', error);
    //             setIsLoading(false);
    //         }
    //     };
    //     onGetMerchantBranch();
    // }, [dispatch, merchantBranchService]);

    return (
        <SafeAreaView style={styles.wrapper}>
            {isLoading ? (
                <Loading />
            ) : (
                <ScrollView>
                    <BackButton onPress={handleBack} />
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            source={BgMerchantBranch}
                            style={styles.bgProfile}
                        />
                    </View>
                    <View style={styles.wrapperProfile}>
                        <View style={styles.outerCircle}>
                            <View style={styles.outerInnerCircle}>
                                <Image source={Logo} style={styles.logo} />
                            </View>
                            <View style={styles.wrapperCamera}>
                                <Image
                                    source={Verified}
                                    style={styles.iconVerified}
                                />
                            </View>
                        </View>
                    </View>
                    <View
                        style={{ marginTop: '20%', justifyContent: 'center' }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: '900',
                                textAlign: 'center',
                            }}
                        >
                            {merchant.merchantName}
                        </Text>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 12,
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
                                    onPress={() => handleToMenu(b.branchID)}
                                    branchName={b.branchName}
                                    branchAddress={b.branchAddress}
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
