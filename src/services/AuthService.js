import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthService = () => {
    const TOKEN_KEY = 'token';

    const logout = () => {
        AsyncStorage.removeItem(TOKEN_KEY);
    };

    const getTokenFromStorage = () => {
        return AsyncStorage.getItem(TOKEN_KEY);
    };

    return {
        logout,
        getTokenFromStorage,
    };
};

export default AuthService;
