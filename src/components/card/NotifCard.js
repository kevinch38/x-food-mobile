import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import React from 'react';

const NotifCard = ({ image, date, title, content, amount }) => {
    return (
        <>
            <View style={styles.card}>
                <View style={styles.image}>
                    <Image
                        source={image}
                        style={{
                            height: '100%',
                            width: '100%',
                            resizeMode: 'cover',
                            borderRadius: 12,
                        }}
                    />
                </View>
                <View
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginLeft: 10,
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 400,
                            color: '#9796A1',
                            fontSize: 12,
                        }}
                    >
                        {date}
                    </Text>
                    <Text style={{ fontWeight: 900, fontSize: 16 }}>
                        {title}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            width: '100%',
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: 500,
                                fontSize: 15,
                                marginRight: 3,
                            }}
                        >
                            {content}
                        </Text>
                        <Text
                            style={{
                                fontWeight: 500,
                                fontSize: 15,
                            }}
                        >
                            {amount}
                        </Text>
                    </View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '85%',
        height: 'min-content',
        flexDirection: 'row',
        marginVertical: '3%',
        marginHorizontal: '8%',
        padding: '5%',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: '#FFF',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 6,
    },
    image: {
        margin: '1%',
        width: 60,
        height: 60,
        borderRadius: 12,
        backgroundColor: '#FFF',
        shadowColor: '#D3D1D8',
        shadowOffset: {
            width: 18.214,
            height: 18.214,
        },
        shadowOpacity: 0.25,
        shadowRadius: 36.42,
        elevation: 6,
    },
});

export default NotifCard;
