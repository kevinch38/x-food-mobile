import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Color from '../assets/Color';

const Button = ({ style, title, onPress }) => {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={[styles.title, style]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 248,
        height: 60,
        backgroundColor: Color.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
    },
    title: {
        color: '#fff',
    },
});

export default Button;
