import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const CardBranch = ({ onPress, image, branchName, branchAddress }) => {
    const base64StringImage = `data:image/jpeg;base64,${image}`;
    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={onPress}>
                <Image
                    source={require('../../assets/images/ph-kalibata.png')}
                    style={styles.image}
                />
                <View
                    style={{
                        marginLeft: '2%',
                        padding: '2%',
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            marginTop: '1%',
                            fontWeight: '900',
                        }}
                    >
                        {branchName}
                    </Text>
                    <Text
                        style={{
                            fontSize: 10,
                            fontWeight: '400',
                        }}
                    >
                        {branchAddress}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
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

export default CardBranch;
