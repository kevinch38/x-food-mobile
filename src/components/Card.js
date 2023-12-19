import { Button } from '@rneui/base';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const Card = ({ image, title, onPress }) => {
    return (
        <View style={styles.card}>
            <Pressable onPress={onPress}>
                <Image style={styles.image} source={{ uri: image }} />
                <Text style={styles.title}>
                    {title}{' '}
                    <Image
                        style={styles.checklist}
                        source={require('../assets/icons/checklist.png')}
                    />
                </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '80%',
        height: 200,
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
        height: 145,
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
