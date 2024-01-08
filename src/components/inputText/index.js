import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { theme } from '../../theme';
import React, { useState } from 'react';

function InputText({
    label,
    labelRequired,
    icon,
    placeholder,
    keyboardType,
    onPressIn,
    value,
    showSoftInputOnFocus,
    onChangeText,
    editable,
    onBlur,
    inputContainerCustom,
    maxLength,
    textInputStyleCustom,
    ...otherProps
}) {
    const [isFocused, setFocused] = useState(false);
    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
        if (onBlur) {
            onBlur();
        }

        if (otherProps.value === '') {
            console.log('Input is empty! Display error message here.');
        }
    };

    const borderColor = isFocused ? theme.secondary : theme.grey;

    return (
        <>
            <View style={styles.labelContainer}>
                {label && <Text style={styles.label}>{label}</Text>}
                {labelRequired && (
                    <Text style={styles.labelRequired}> {labelRequired}</Text>
                )}
            </View>
            <View
                style={[
                    styles.inputContainer,
                    { borderColor },
                    inputContainerCustom,
                ]}
            >
                {icon && <Image source={icon} style={styles.iconContainer} />}
                <TextInput
                    style={[styles.textInput, textInputStyleCustom]}
                    placeholder={placeholder}
                    placeholderTextColor={theme.grey}
                    keyboardType={keyboardType}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    {...otherProps}
                    onPressIn={onPressIn}
                    value={value}
                    showSoftInputOnFocus={showSoftInputOnFocus}
                    onChangeText={onChangeText}
                    editable={editable}
                    maxLength={maxLength}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    textInput: {
        fontWeight: '400',
        fontSize: 17,
        width: '100%',
        height: '100%',
    },
    labelContainer: { flexDirection: 'row', marginTop: 17 },
    label: {
        color: theme.grey,
        fontWeight: '400',
        fontSize: 16,
    },
    labelRequired: {
        color: theme.secondary,
        fontSize: 13,
    },
    iconContainer: {
        width: 24,
        height: 24,
        marginRight: 12,
    },
    inputContainer: {
        height: 65,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 10,
        paddingHorizontal: 16,
    },
});
export default InputText;
