import { StyleSheet, TextInput, View } from 'react-native';
import { theme } from '../theme';
import { useState } from 'react';

const InputText = ({ placeholder, style, keyboardType, onPressIn, value }) => {
    const [isFocused, setFocused] = useState(false);
    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    const borderColor = isFocused ? theme.secondary : theme.grey;

    return (
        <View>
            <TextInput
                placeholder={placeholder}
                keyboardType={keyboardType}
                style={[styles.textInput, style, { borderColor }]}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onPressIn={onPressIn}
                value={value}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        height: 65,
        marginTop: 9,
        borderRadius: 10,
        paddingHorizontal: 16,
        fontWeight: '500',
        fontSize: 17,
    },
});
export default InputText;
