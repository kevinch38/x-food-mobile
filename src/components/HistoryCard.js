import {Text, View, StyleSheet, Image} from "react-native";
import React from "react";

const HistoryCard = ({image, date, title, content, amount}) => {
    return (
        <>
            <View style={styles.card}>
                <View>
                    <Image
                        source={{ uri: `data:image/jpeg;base64,${image}` }}
                        style={styles.image}
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
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 500, fontSize: 15 }}>
                            {content}
                        </Text>
                        <Text
                            style={{
                                marginLeft: 3,
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
}

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
        borderRadius: 18.214,
        backgroundColor: '#FFF',
        elevation: 10,
        shadowColor: '#D3D1D8',
        shadowOffset: {
            width: 18.214,
            height: 18.214,
        },
        shadowOpacity: 0.25,
        shadowRadius: 36.42,
    },
});

export default HistoryCard
