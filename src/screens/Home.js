import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Card from '../components/card/Card';
import { SearchBar } from '@rneui/base';
import Color from '../assets/Color';
import { useDispatch, useSelector } from 'react-redux';
import { ServiceContext } from '../context/ServiceContext';
import { merchantAction } from '../slices/merchantSlice';
import { cityAction } from '../slices/citySlice';
import { Dropdown } from 'react-native-element-dropdown';
import { Icon } from '@rneui/themed';
import { loyaltyPointAction } from '../slices/loyaltyPointSlice';
import { userAction } from '../slices/userSlice';
import { fetchBalanceAction } from '../slices/balanceSlice';
import { formatIDRCurrency } from '../utils/utils';
import Loading from '../components/loading';

const Home = ({ navigation }) => {
    const dispatch = useDispatch();
    const cities = useSelector((state) => state.city.cities);
    const merchants = useSelector((state) => state.merchant.merchants);
    const users = useSelector((state) => state.user.users);
    const phoneNumber = useSelector((state) => state.ui.phoneNumber);
    const { loyaltyPoints } = useSelector((state) => state.loyaltyPoint);
    const { balance } = useSelector((state) => state.balance);
    const {
        merchantService,
        cityService,
        loyaltyPointService,
        userService,
        balanceService,
    } = useContext(ServiceContext);

    const [search, setSearch] = useState('');
    const [items, setItems] = useState([]);
    const [cityId, setCityId] = useState(() => {
        const findCity = items.find(
            (item) => item.cityName === 'Kota Administrasi Jakarta Selatan',
        );
        console.log('findCityID:', findCity);
        return findCity ? findCity.cityID : '';
    });
    const [isLoading, setIsLoading] = useState(false);
    const [userLoad, setUserLoad] = useState(false);

    useEffect(() => {
        if (users) {
            fetchData();
            setUserLoad(true);
        }
    }, [fetchData, users]);

    useEffect(() => {
        if (userLoad) {
            const onFocusListener = navigation.addListener('focus', () => {
                fetchData();
            });

            return () => {
                onFocusListener();
            };
        }
    }, [navigation, fetchData, userLoad]);

    useEffect(() => {
        setItems(cities);
    }, [cities]);

    useEffect(() => {
        const onGetCities = async () => {
            await dispatch(cityAction(() => cityService.fetchCities()));
        };

        const onGetMerchants = async () => {
            await dispatch(
                merchantAction(() => merchantService.fetchMerchants()),
            );
        };
        onGetCities();
        onGetMerchants();
    }, [dispatch, cityService, merchantService]);

    // useEffect(() => {
    //     const onGetUserByPhoneNumber = async () => {
    //         try {
    //             dispatch(
    //                 userAction(async () => {
    //                     const result =
    //                         await userService.fetchUserByPhoneNumber(
    //                             phoneNumber,
    //                         );
    //                     return result;
    //                 }),
    //             );
    //         } catch (e) {
    //             console.error('Error fetching user data: ', e);
    //         }
    //     };

    //     onGetUserByPhoneNumber();
    // }, [dispatch, userService, phoneNumber]);

    const filteredMerchants = merchants.filter((merchant) => {
        const branches = merchant.merchantBranches || [];
        const hasMatchingBranch = branches.some(
            (branch) => branch.city.cityID === cityId,
        );
        return hasMatchingBranch;
    });

    const handleNotification = () => {
        navigation.navigate('Notification');
    };

    const filteredSearchMerchants =
        search.trim() === ''
            ? filteredMerchants
            : filteredMerchants.filter((merchant) =>
                  merchant.merchantName
                      .toLowerCase()
                      .includes(search.toLowerCase()),
              );

    const handleCard = (id) => {
        navigation.navigate('Merchant', { id });
    };

    const handleTopUp = () => {
        navigation.navigate('TopUp');
    };

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);

            dispatch(
                userAction(async () => {
                    const result =
                        await userService.fetchUserByPhoneNumber(phoneNumber);
                    return result;
                }),
            );

            if (users && users.balance) {
                await dispatch(
                    fetchBalanceAction(async () => {
                        const result = balanceService.fetchBalance(
                            users.balance.balanceID,
                        );
                        return result;
                    }),
                );
                await dispatch(
                    loyaltyPointAction(async () => {
                        const result =
                            loyaltyPointService.fetchLoyaltyPointById(
                                users.loyaltyPoint.loyaltyPointID,
                            );
                        return result;
                    }),
                );
            }
        } catch (e) {
            console.error('Error fetching data: ', e);
        } finally {
            setIsLoading(false);
        }
    }, [
        dispatch,
        cityService,
        merchantService,
        userService,
        balanceService,
        loyaltyPointService,
        phoneNumber,
        users,
        cities,
    ]);

    const renderNotification = () => {
        return (
            <View style={styles.notifBell}>
                <Icon
                    color={Color.primary}
                    containerStyle={{}}
                    disabledStyle={{}}
                    iconProps={{}}
                    iconStyle={{}}
                    name="notifications"
                    onPress={handleNotification}
                    size={40}
                    type="material"
                />
            </View>
        );
    };

    const renderLocation = () => {
        return (
            <View style={styles.topArea}>
                <View style={styles.dropdownArea}>
                    <View style={styles.viewLocation}>
                        <Text style={styles.textLocation}>Location</Text>
                        {/*<Icon*/}
                        {/*    color="#989CA3"*/}
                        {/*    name="chevron-down"*/}
                        {/*    size={10}*/}
                        {/*    type="font-awesome-5"*/}
                        {/*/>*/}
                    </View>

                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={items}
                        search
                        maxHeight={400}
                        labelField="cityName"
                        valueField="cityID"
                        placeholder="Select city"
                        searchPlaceholder="Search..."
                        value={cityId}
                        onChange={(item) => {
                            setCityId(item.cityID);
                        }}
                    />
                </View>
            </View>
        );
    };

    const renderSearch = () => {
        <View style={styles.areaSearchBar}>
            <View style={styles.searchBar}>
                <SearchBar
                    platform="android"
                    onChangeText={(newVal) => setSearch(newVal)}
                    onClearText={() => console.log(onClearText())}
                    placeholder="Find for food or restaurant..."
                    placeholderTextColor="#888"
                    cancelButtonTitle="Cancel"
                    fontSize={14}
                    value={search}
                    round={true}
                />
            </View>
        </View>;
    };

    const renderAccountSummary = () => {
        return (
            <View style={styles.summary}>
                <Image
                    style={{ width: 33, height: 19 }}
                    source={require('../assets/images/card.png')}
                />
                <Text>{formatIDRCurrency(balance.totalBalance)}</Text>
                <Pressable onPress={handleTopUp}>
                    <Text style={{ color: '#5681A5' }}>TOP UP</Text>
                </Pressable>
                <Image
                    style={{ width: 20, height: 20 }}
                    source={require('../assets/icons/dollar.png')}
                />
                <Text>{loyaltyPoints.loyaltyPointAmount}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.wrapper}>
            <StatusBar barStyle={'light-content'} />
            {isLoading ? (
                <Loading style={{ zIndex: 999 }} />
            ) : (
                <ScrollView>
                    <View style={styles.container}>
                        {renderNotification()}
                        {renderLocation()}
                        <Text style={styles.title}>
                            Where would you like to eat
                        </Text>
                        {renderSearch()}

                        <View style={styles.viewTitle}>
                            <Text style={styles.titleList}>
                                Featured Restaurants
                            </Text>
                        </View>
                        {renderAccountSummary()}

                        {Array.isArray(filteredSearchMerchants) &&
                            filteredSearchMerchants.length > 0 &&
                            filteredSearchMerchants.map((m, idx) => {
                                return (
                                    <Card
                                        key={idx}
                                        onPress={() => handleCard(m.merchantID)}
                                        image={m.image}
                                        title={m.merchantName}
                                    />
                                );
                            })}
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: '3%',
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    notifBell: {
        position: 'absolute',
        top: '3%',
        right: '10%',
    },
    viewLocation: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline',
    },
    textLocation: {
        fontSize: 14,
        color: '#989CA3',
        textAlign: 'center',
        marginRight: 10,
    },
    searchBar: {
        margin: 10,
        width: '80%',
        borderRadius: 10,
        borderColor: '#EFEFEF',
        borderWidth: 3,
        marginEnd: 10,
        flexBasis: '80%',
        fontSize: 14,
    },
    areaSearchBar: {
        width: '100%',
        justifyContent: 'center',
        marginTop: 10,
        flexDirection: 'row',
    },
    viewTitle: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: '3%',
    },
    dropdown: { width: 170 },
    topArea: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    dropdownArea: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: '900',
        width: 290,
        marginTop: 40,
    },
    filter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    summary: {
        width: '70%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 10,
    },
    titleList: {
        fontWeight: '900',
        fontSize: 20,
        marginRight: 10,
    },
    viewAll: {
        fontWeight: '400',
        fontSize: 13,
        color: Color.primary,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 15,
        color: Color.primary,
    },
    selectedTextStyle: {
        fontSize: 15,
        color: Color.primary,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 15,
        color: Color.primary,
    },
});

export default Home;
