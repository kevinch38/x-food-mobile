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
    card : {
        width: 290,
        height: 109,
        flexDirection:"row",
        marginBottom :20,
        padding :20,
        alignItems:"center",
        borderRadius: 18.214,
        backgroundColor: '#FFF',
        elevation: 5,
        shadowColor: '#D3D1D8',
        shadowOffset: {
            width: 18.214,
            height: 18.214,
        },
        shadowOpacity: 0.25,
        shadowRadius: 36.42

    },
    image : {
        margin: 10,
        width: 60,
        height : 60,
        borderRadius: 18.214,
        backgroundColor: '#FFF',
        elevation: 10,
        shadowColor: '#D3D1D8',
        shadowOffset: {
            width: 18.214,
            height: 18.214,
        },
        shadowOpacity: 0.25,
        shadowRadius: 36.42
    }
})

export default HistoryCard
