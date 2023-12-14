import { StyleSheet, TextInput, View } from 'react-native';
import { theme } from '../theme';
import { useState } from 'react';

const InputText = ({
    placeholder,
    style,
    keyboardType,
    onPressIn,
    value,
    showSoftInputOnFocus,
    onChangeText,
    editable,
}) => {
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
                placeholderTextColor={theme.grey}
                keyboardType={keyboardType}
                style={[styles.textInput, style, { borderColor }]}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onPressIn={onPressIn}
                value={value}
                showSoftInputOnFocus={showSoftInputOnFocus}
                onChangeText={onChangeText}
                editable={editable}
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
        fontWeight: '400',
        fontSize: 17,
    },
});
export default InputText;
