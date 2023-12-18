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
import { Dropdown } from 'react-native-element-dropdown';

const Home = () => {
    const dispatch = useDispatch();
    const merchants = useSelector((state) => state.merchant.merchants);
    const { merchantService } = useContext(ServiceContext);
    const [value, setValue] = useState('');
    const [search, setSearch] = useState('');
    const [items, setItems] = useState([
        {
            label: 'South Jakarta, Indonesia',
            value: 'South Jakarta, Indonesia',
        },
        {
            label: 'North Jakarta, Indonesia',
            value: 'North Jakarta, Indonesia',
        },
    ]);

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
                    <View style={styles.topArea}>
                        <View>
                            <Text style={{ fontSize: 14 }}>Location</Text>
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
                        <Pressable>
                            <Image
                                style={{ height: 34, width: 34 }}
                                source={require('../assets/icons/Bell.png')}
                            />
                        </Pressable>
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
                        <Pressable style={styles.filter}>
                            <Image
                                style={{ width: 23, height: 23 }}
                                source={require('../assets/icons/filter.png')}
                            />
                        </Pressable>
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
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text style={styles.titleList}>
                            Featured Restaurants
                        </Text>
                        <Text style={styles.viewAll}>View All</Text>
                    </View>

                    {merchants?.length !== 0 &&
                        merchants.map((m, idx) => {
                            return (
                                <Card
                                    key={idx}
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
        width: '50%',
        borderRadius: 10,
        borderColor: '#EFEFEF',
        borderWidth: 3,
        marginEnd: 10,
        flexBasis: '80%',
        fontSize: 14,
    },
    areaSearchBar: {
        width: '75%',
        justifyContent: 'center',
        marginTop: 10,
        flexDirection: 'row',
    },
    dropdown: { width: 170, marginRight: '10%' },
    topArea: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
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
        fontSize: 18,
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
