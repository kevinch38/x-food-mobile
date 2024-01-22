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
    const today = now
        .toLocaleDateString('en-US', { weekday: 'long' })
        .slice(0, 3)
        .toUpperCase();

    const isOpen = branchWorkingHours.some((branchHour) => {
        return (
            branchHour.days.slice(0, 3).toUpperCase() === today &&
            isTimeInOpenRange(branchHour.openHour, branchHour.closeHour)
        );
    });

    function isTimeInOpenRange(openHour, closeHour) {
        const openingTime = new Date();
        openingTime.setHours(parseInt(openHour.split(':')[0], 10));
        openingTime.setMinutes(parseInt(openHour.split(':')[1], 10));
        openingTime.setSeconds(parseInt(openHour.split(':')[2], 10));

        const closingTime = new Date();
        closingTime.setHours(parseInt(closeHour.split(':')[0], 10));
        closingTime.setMinutes(parseInt(closeHour.split(':')[1], 10));
        closingTime.setSeconds(parseInt(closeHour.split(':')[2], 10));

        const currentTime = now.getTime();

        return (
            currentTime >= openingTime.getTime() &&
            currentTime <= closingTime.getTime()
        );
    }

    const bgIsOpen = isOpen ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.6)';

    return (
        <View style={styles.card}>
            <TouchableOpacity
                onPress={onPress}
                disabled={!isOpen}
                style={{ opacity: isOpen ? 1 : 0.4 }}
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
