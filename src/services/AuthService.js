import axios from 'axios';
import { AsyncStorage } from 'react-native';

const AuthService = () => {
    const TOKEN_KEY = 'token';

    const login = async (user) => {
        const { data } = await axiosInstance.post(
            'http://10.0.2.2:8087/api/auth/login',
            user,
        );
        return data;
    };

    const logout = () => {
        AsyncStorage.removeItem(TOKEN_KEY);
    };

    const getUserInfo = async () => {
        const { data } = await axiosInstance.get(
            'http://10.0.2.2:8087/api/users/me',
        );
        return data;
    };

    const getTokenFromStorage = () => {
        return AsyncStorage.getItem(TOKEN_KEY);
    };

    return {
        login,
        logout,
        getUserInfo,
        getTokenFromStorage,
    };
};

export default AuthService;
