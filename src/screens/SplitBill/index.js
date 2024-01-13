import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import * as Icon from 'react-native-feather';
import InputText from '../../components/inputText';
import Color from '../../assets/Color';
import Button from '../../components/button';
import { useDispatch, useSelector } from 'react-redux';
import { ServiceContext } from '../../context/ServiceContext';
import { friendAction } from '../../slices/friendSlice';
import { RoundedCheckbox } from 'react-native-rounded-checkbox';

function SplitBill({ navigation, route }) {
    const dispatch = useDispatch();
    const { friends } = useSelector((state) => state.friend);
    const { friendService } = useContext(ServiceContext);
    const order = route.params?.order;
    const [avatarData, setAvatarData] = useState([]);

    const handleCheck = (contact) => {
        let check = avatarData.find(
            (data) => data.friendID === contact.friendID,
        );
        if (check) {
            setAvatarData((prevAvatarData) =>
                prevAvatarData.filter(
                    (data) => data.friendID !== contact.friendID,
                ),
            );
        } else {
            setAvatarData([...avatarData, contact]);
        }
    };

    useEffect(() => {
        try {
            dispatch(
                friendAction(async () => {
                    const result = friendService.fetchFriend(
                        order.data.accountID,
                    );
                    return result;
                }),
            );
        } catch (e) {
            console.error('Error fetching friend data: ', e);
        }
    }, [dispatch, friendService]);

    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.btnBack}
                    onPress={() => navigation.goBack()}
                >
                    <Icon.ChevronLeft
                        width={24}
                        height={24}
                        strokeWidth={3}
                        color={'#000'}
                    />
                </TouchableOpacity>
                <Text style={styles.titleHeader}>Split Bill</Text>
                <Image
                    source={require('../../assets/images/profile.png')}
                    style={styles.imageProfile}
                />
            </View>
        );
    };
    const renderSendTo = () => {
        return (
            <View style={styles.sendToContainer}>
                <Text style={styles.titleSendTo}>Send to</Text>
                <View style={styles.avatarSendToContainer}>
                    {avatarData.map((avatar) => (
                        <View style={styles.avatarSendTo} key={avatar.id}>
                            <Image
                                source={require('../../assets/images/avatar.png')}
                                style={styles.imageAvatar}
                            />
                            <Text style={styles.nameAvatar}>
                                {avatar.accountFirstName2}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        );
    };
    const renderAddContact = () => {
        return (
            <View style={styles.addContactContainer}>
                <View style={styles.titleAddContact}>
                    <Text style={styles.title}>Contacts</Text>
                    <TouchableOpacity style={styles.btnPlusAddContact}>
                        <Icon.Plus
                            width={16}
                            height={16}
                            strokeWidth={3}
                            color={'#fff'}
                        />
                    </TouchableOpacity>
                </View>
                <InputText
                    icon={require('../../assets/icons/search.png')}
                    placeholder={'Find Friend'}
                />
            </View>
        );
    };
    const renderContact = () => {
        return (
            <View style={styles.contactContainer}>
                {friends.map((contact) => (
                    <View style={styles.contact} key={contact.id}>
                        <View style={styles.nameContact}>
                            <Image
                                source={require('../../assets/images/avatar.png')}
                            />
                            <Text style={styles.name}>
                                {contact.accountFirstName2}{' '}
                                {contact.accountLastName2}
                            </Text>
                        </View>

                        <RoundedCheckbox
                            text={
                                <Icon.Check
                                    width={20}
                                    height={20}
                                    strokeWidth={3}
                                    color={'#fff'}
                                />
                            }
                            checkedColor={Color.primary}
                            uncheckedColor={Color.gray}
                            onPress={() => handleCheck(contact)}
                        />
                    </View>
                ))}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                {renderHeader()}
                {renderSendTo()}
                {renderAddContact()}
                {renderContact()}
            </ScrollView>
            <View style={styles.btnContainer}>
                <Button
                    onPress={() => navigation.navigate('SplitBillAddPosition',{avatarData, order})}
                    title={'Next'}
                    titleStyle={styles.titleStyle}
                    buttonStyle={styles.buttonStyle}
                />
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
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 37,
        paddingHorizontal: 27,
    },
    btnBack: {
        width: 38,
        height: 38,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    titleHeader: {
        fontWeight: '500',
        fontSize: 18,
    },
    imageProfile: {
        height: 38,
        width: 38,
        borderRadius: 12,
    },
    sendToContainer: {
        marginVertical: 31,
        marginHorizontal: 27,
        backgroundColor: 'rgba(255, 197, 41, 0.4)',
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    titleSendTo: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
    },
    avatarSendToContainer: {
        flexDirection: 'row',
    },
    avatarSendTo: {
        marginRight: 12,
    },
    imageAvatar: {
        marginBottom: 8,
    },
    btnClose: {
        position: 'absolute',
        top: -6,
        right: -6,
        height: 24,
        width: 24,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    nameAvatar: {
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
    },
    addContactContainer: {
        marginHorizontal: 27,
    },
    titleAddContact: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginRight: 12,
    },
    btnPlusAddContact: {
        backgroundColor: '#FE724C',
        width: 20,
        height: 20,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contactContainer: {
        marginVertical: 24,
        marginHorizontal: 27,
        marginBottom: 100,
    },
    contact: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    nameContact: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: 15,
        fontWeight: '600',
        marginLeft: 24,
    },
    btnContainer: {
        borderTopStartRadius: 24,
        borderTopEndRadius: 24,
        marginTop: -48,
        backgroundColor: '#fff',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 28,
        paddingHorizontal: 34,
    },
    buttonStyle: {
        borderRadius: 20,
        width: '100%',
    },
    titleStyle: {
        fontSize: 16,
        fontWeight: '600',
    },
});
export default SplitBill;
