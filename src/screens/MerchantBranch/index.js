import {
    View,
    SafeAreaView,
    ScrollView,
    Image,
    StyleSheet,
    StatusBar,
    Text,
} from 'react-native';
import React, { useContext, useEffect } from 'react';
import BackButton from '../../components/backButton';
import Logo from '../../assets/images/mechant-logo.png';
import Verified from '../../assets/images/verified.png';
import BgMerchantBranch from '../../assets/images/bg-merchant-page.png';
import { useRoute } from '@react-navigation/native';
import { selectedMerchantAction } from '../../slices/merchantSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ServiceContext } from '../../context/ServiceContext';
import { merchantBranchAction } from '../../slices/merchantBranch';

const Merchant = ({ navigation }) => {
    const dispatch = useDispatch();
    const merchant = useSelector((state) => state.merchant.selectedMerchant);
    const branchs = useSelector((state) => state.merchantBranch.branchs);
    const { merchantService, merchantBranchService } =
        useContext(ServiceContext);
    const route = useRoute();
    const receivedId = route.params?.id;
    const cityId = route.params?.cityId;

    const filteredBranch = branchs.filter(
        (branch) =>
            branch.merchantID === receivedId && branch.cityID === cityId,
    );

    handleBack = () => {
        navigation.navigate('Tabs');
    };

    useEffect(() => {
        const onGetMerchant = async () => {
            await dispatch(
                selectedMerchantAction(() =>
                    merchantService.fetchMerchantById(receivedId),
                ),
            );
        };
        onGetMerchant();
    }, [dispatch, merchantService]);

    useEffect(() => {
        const onGetMerchantBranch = async () => {
            await dispatch(
                merchantBranchAction(() =>
                    merchantBranchService.fetchMerchantBranchs(receivedId),
                ),
            );
        };
        onGetMerchantBranch();
    }, [dispatch, merchantBranchService]);

    return (
        <SafeAreaView style={styles.wrapper}>
            <ScrollView>
                <BackButton onPress={handleBack} />
                <View style={{ alignItems: 'center' }}>
                    <Image source={BgMerchantBranch} style={styles.bgProfile} />
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
                <View style={{ marginTop: '20%', justifyContent: 'center' }}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: '900',
                            textAlign: 'center',
                        }}
                    >
                        {/* {merchant.merchantName} */}
                    </Text>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 12,
                            fontWeight: '300',
                        }}
                    >
                        {/* {merchant.merchantDescription} */}
                    </Text>
                </View>

                {Array.isArray(filteredBranch) &&
                    filteredBranch.length > 0 &&
                    filteredBranch.map((b, idx) => {
                        return (
                            <View style={styles.card} key={idx}>
                                <Image
                                    source={require('../../assets/images/ph-kalibata.png')}
                                    style={styles.image}
                                />
                                <View
                                    style={{ marginLeft: '2%', padding: '2%' }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            marginTop: '1%',
                                            fontWeight: '900',
                                        }}
                                    >
                                        {b.branchName}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 10,
                                            fontWeight: '400',
                                        }}
                                    >
                                        {b.address}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
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
        marginTop: -23,
        resizeMode: 'contain',
        width: 378,
        height: 285,
        position: 'absolute',
    },
    card: {
        width: '80%',
        marginHorizontal: '10%',
        marginTop: '5%',
        marginBottom: '2%',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    image: {
        width: '100%',
        height: 145,
        resizeMode: 'cover',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
});

export default Merchant;
