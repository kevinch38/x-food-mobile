import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import back from '../../assets/icons/back.png';

const BackButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.wrapper} onPress={onPress}>
            <Image source={back} style={styles.iconBack} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        zIndex: 1,
    },
    iconBack: {
        marginTop: 28,
        marginLeft: 27,
        height: 80,
        width: 80,
    },
});

export default BackButton;
