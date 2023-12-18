import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    StatusBar,
    Image,
    Pressable,
    ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { SearchBar } from '@rneui/base';
import Color from '../assets/Color';
import { useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';
import { ServiceContext } from '../context/ServiceContext';
import { merchantAction } from '../slices/merchantSlice';
import { cityAction } from '../slices/citySlice';
import { Dropdown } from 'react-native-element-dropdown';
import { Icon } from '@rneui/themed';

const Home = ({ navigation }) => {
    const dispatch = useDispatch();
    const merchants = useSelector((state) => state.merchant.merchants);
    const cities = useSelector((state) => state.city.cities);
    const { merchantService, cityService } = useContext(ServiceContext);
    const [value, setValue] = useState('');
    const [search, setSearch] = useState('');
    const [items, setItems] = useState([]);

    handleCard = () => {
        navigation.navigate('Merchant');
    };

    useEffect(() => {
        setItems(cities);
    }, []);

    useEffect(() => {
        const onGetCities = () => {
            dispatch(
                cityAction(async () => {
                    const response = await cityService.fetchCities();
                    return response;
                }),
            );
        };
        onGetCities();
    }, []);

    useEffect(() => {
        const onGetMerchant = () => {
            dispatch(
                merchantAction(async () => {
                    const response = await merchantService.fetchMerchants();
                    return response;
                }),
            );
        };
        onGetMerchant();
    }, [dispatch, merchantService]);

    return (
        <SafeAreaView style={styles.wrapper}>
            <ScrollView>
                <View style={styles.container}>
                    <View
                        style={{
                            position: 'absolute',
                            top: '1%',
                            right: '10%',
                        }}
                    >
                        <Pressable>
                            <Image
                                style={{ height: 34, width: 34 }}
                                source={require('../assets/icons/Bell.png')}
                            />
                        </Pressable>
                    </View>
                    <View style={styles.topArea}>
                        <View style={styles.dropdownArea}>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'baseline',
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: '#989CA3',
                                        textAlign: 'center',
                                        marginRight: 10,
                                    }}
                                >
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
                                labelField="label"
                                valueField="value"
                                placeholder="Select city"
                                searchPlaceholder="Search..."
                                value={value}
                                onChange={(item) => {
                                    setValue(item.value);
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
                        <Pressable>
                            <Text style={{ color: '#5681A5' }}>TOP UP</Text>
                        </Pressable>
                        <Image
                            style={{ width: 20, height: 20 }}
                            source={require('../assets/icons/dollar.png')}
                        />
                        <Text>0</Text>
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginVertical: '3%',
                        }}
                    >
                        <Text style={styles.titleList}>
                            Featured Restaurants
                        </Text>
                    </View>

                    {merchants?.length !== 0 &&
                        merchants.map((m, idx) => {
                            return (
                                <Card
                                    key={idx}
                                    onClick={handleCard}
                                    image={
                                        'https://source.unsplash.com/random/1500x500?food'
                                    }
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
        marginTop: 50,
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
