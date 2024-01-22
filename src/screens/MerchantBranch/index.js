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
    const route = useRoute();
    const merchant = useSelector((state) => state.merchant.selectedMerchant);
    const { merchantService } = useContext(ServiceContext);
    const receivedId = route.params?.id;
    const [cityId, setCityId] = useState(route.params?.cityID);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (route.params?.cityId) {
            setCityId(route.params.cityId);
        }
    }, [route.params?.cityID]);

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
                    <View
                        style={{
                            alignItems: 'center',
                            width: '90%',
                            height: 180,
                            marginHorizontal: '5%',
                            marginTop: '2%',
                            position: 'absolute',
                        }}
                    >
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
                        merchant.merchantBranches
                            .filter(
                                (branch) =>
                                    branch.status === 'ACTIVE' &&
                                    branch.items.length > 0 &&
                                    branch.city.cityID === cityId,
                            )
                            .map((branch, idx) => {
                                return (
                                    <CardBranch
                                        key={idx}
                                        image={branch.image}
                                        onPress={() =>
                                            handleToMenu(branch.branchID)
                                        }
                                        branchName={branch.branchName}
                                        branchAddress={branch.address}
                                        branchWorkingHours={
                                            branch.branchWorkingHours
                                        }
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
        marginTop: 180,
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
        resizeMode: 'contain',
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
        width: '100%',
        height: '100%',
        // marginTop: -35,
        resizeMode: 'cover',
        borderRadius: 10,
    },
});

export default Merchant;
