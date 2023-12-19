import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const Card = ({ image, title }) => {
    return (
        <View style={styles.card}>
            <Image style={styles.image} source={{ uri: image }} />
            <Text style={styles.title}>
                {title}{' '}
                <Image
                    style={styles.checklist}
                    source={require('../assets/icons/checklist.png')}
                />
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '70%',
        height: 183,
        borderRadius: 10,
        backgroundColor: '#fff',
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 136,
        resizeMode: 'cover',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        padding: 10,
    },
    checklist: {
        height: 10,
        width: 10,
    },
});

export default Card;