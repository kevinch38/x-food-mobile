import { StyleSheet, Text } from 'react-native';
import { theme } from '../../theme';

const ErrorText = ({ message }) => {
    return <Text style={styles.errorText}>{message}</Text>;
};

const styles = StyleSheet.create({
    errorText: {
        color: theme.secondary,
        fontSize: 12,
        fontWeight: '400',
        marginTop: 3,
    },
});
export default ErrorText;
