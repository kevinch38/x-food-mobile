import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Color from '../../assets/Color';

const Button = ({ buttonStyle, titleStyle, title, onPress, disabled }) => {
    return (
        <TouchableOpacity
            style={[styles.buttonStyle, buttonStyle]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        width: 248,
        height: 60,
        backgroundColor: Color.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
    },
    titleStyle: {
        color: '#fff',
    },
});

export default Button;
