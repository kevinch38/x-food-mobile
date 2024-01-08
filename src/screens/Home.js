import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    StatusBar,
    Image,
    Pressable,
    ScrollView,
    Button,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Card from '../components/card/Card';
import { SearchBar } from '@rneui/base';
import Color from '../assets/Color';
import { useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';
import { ServiceContext } from '../context/ServiceContext';
import { merchantAction } from '../slices/merchantSlice';
import { cityAction } from '../slices/citySlice';
import { Dropdown } from 'react-native-element-dropdown';
import { Icon } from '@rneui/themed';
import { loyaltyPointAction } from '../slices/loyaltyPointSlice';
import { userAction } from '../slices/userSlice';

const Home = ({ navigation }) => {
    const dispatch = useDispatch();
    const merchants = useSelector((state) => state.merchant.merchants);
        const { cities } = useSelector((state) => state.city);
        const { users } = useSelector((state) => state.user);
        const { phoneNumber } = useSelector((state) => state.ui);
        const { loyaltyPoints } = useSelector((state) => state.loyaltyPoint);
    const { merchantService, cityService, loyaltyPointService, userService } =
        useContext(ServiceContext);
    const [cityId, setCityId] = useState('8a8ae40b8cd4debc018cd4dec9c70113');
    const [search, setSearch] = useState('');
    const [items, setItems] = useState([]);

    const filteredMerchants = merchants.filter((merchant) => {
        const branches = merchant.merchantBranches || [];
        const hasMatchingBranch = branches.some(
            (branch) => branch.city.cityID === cityId,
        );
        return hasMatchingBranch;
    });

    console.log('users => ', users);
     console.log('phoneNUmber => ', phoneNumber);
    


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

    useEffect(() => {
        setItems(cities);
    }, [cities]);

    useEffect(() => {
        const onGetCities = async () => {
            await dispatch(cityAction(() => cityService.fetchCities()));
        };
        onGetCities();
    }, [dispatch, cityService]);

    useEffect(() => {
        const onGetUserByPhoneNumber = () => {
            try {
                dispatch(
                    userAction(async () => {
                        const result =
                            await userService.fetchUserByPhoneNumber(
                                phoneNumber,
                            );
                        return result;
                    }),
                );
            } catch (e) {
                console.error('Error fetching user data: ', e);
            }
        };

        const onGetMerchants = async () => {
            await dispatch(
                merchantAction(() => merchantService.fetchMerchants()),
            );
        };

        const onGetLoyaltyPointAmount = () => {
            try {
                dispatch(
                    loyaltyPointAction(async () => {
                        const result =
                            loyaltyPointService.fetchLoyaltyPointById(
                                users.loyaltyPointID,
                            );
                        return result;
                    }),
                );
            } catch (e) {
                console.error('Error fetching loyalty point data: ', e);
            }
        };

        onGetUserByPhoneNumber();
        onGetMerchants();
        onGetLoyaltyPointAmount();
    }, [
        dispatch,
        merchantService,
        loyaltyPointService,
        userService,
        Object.keys(users).length,
    ]);

    const handleTopUp = () => {
        navigation.navigate('TopUp');
    };

    return (
        <SafeAreaView style={styles.wrapper}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.notifBell}>
                        <Pressable>
                            <Image
                                style={{ height: 34, width: 34 }}
                                source={require('../assets/icons/Bell.png')}
                            />
                        </Pressable>
                    </View>
                    <View style={styles.topArea}>
                        <View style={styles.dropdownArea}>
                            <View style={styles.viewLocation}>
                                <Text style={styles.textLocation}>
                                    Location
                                </Text>
                                <Icon
                                    color="#989CA3"
                                    name="chevron-down"
                                    size={10}
                                    type="font-awesome-5"
                                />
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
                    <Text style={styles.title}>
                        Where would you like to eat
                    </Text>
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
                    </View>
                    <View style={styles.summary}>
                        <Image
                            style={{ width: 33, height: 19 }}
                            source={require('../assets/images/card.png')}
                        />
                        <Text>Rp.0</Text>
                        <Pressable onPress={handleTopUp}>
                            <Text style={{ color: '#5681A5' }}>TOP UP</Text>
                        </Pressable>
                        <Image
                            style={{ width: 20, height: 20 }}
                            source={require('../assets/icons/dollar.png')}
                        />
                        <Text>{loyaltyPoints.loyaltyPointAmount}</Text>
                    </View>
                    <View style={styles.viewTitle}>
                        <Text style={styles.titleList}>
                            Featured Restaurants
                        </Text>
                    </View>

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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#fff',
        marginTop: 20,
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    notifBell: {
        position: 'absolute',
        top: '1%',
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
