import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const Account = ({ onPress, image }) => {
    return (
        <TouchableOpacity style={styles.wrapper} onPress={onPress}>
            <Image source={image} style={styles.imageStyle} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        zIndex: 1,
        right: '7%',
    },
    imageStyle: {
        height: 40,
        width: 40,
        borderRadius: 10,
    },
});

export default Account;
