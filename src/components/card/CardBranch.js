import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const CardBranch = ({
    onPress,
    image,
    branchName,
    branchAddress,
    branchWorkingHours,
}) => {
    const base64StringImage = `data:image/jpeg;base64,${image}`;

    const now = new Date();
    const today = now.toLocaleDateString('en-US', { weekday: 'long' });

    const isOpen = branchWorkingHours.some(({ days, openHour, closeHour }) => {
        const openTime = new Date(`2000-01-01T${openHour}`);
        const closeTime = new Date(`2000-01-01T${closeHour}`);

        return today === days && now >= openTime && now <= closeTime;
    });

    const bgIsOpen = isOpen ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,1)';

    return (
        <View style={styles.card}>
            <TouchableOpacity
                onPress={onPress}
                disabled={isOpen}
                style={(backgroundColor = bgIsOpen)}
            >
                <Image
                    source={{ uri: base64StringImage }}
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
                            fontSize: 20,
                            marginTop: '1%',
                            fontWeight: '900',
                        }}
                    >
                        {branchName}
                    </Text>
                    <Text
                        style={{
                            fontSize: 15,
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
        width: '90%',
        marginHorizontal: '5%',
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
        height: 160,
        resizeMode: 'cover',
        borderRadius: 10,
    },
});

export default CardBranch;
