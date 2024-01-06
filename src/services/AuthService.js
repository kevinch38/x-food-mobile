import axios from 'axios';
import { AsyncStorage } from 'react-native';

const AuthService = () => {
    const TOKEN_KEY = 'token';

    const login = async (user) => {
        const { data } = await axiosInstance.post(
            'http://10.0.2.2:8087/api/auth/login',
            user,
        );
        if (data.token) {
            await AsyncStorage.setItem(TOKEN_KEY, data.token);
        }
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

    // const fetchUserByPhoneNumber = async (phoneNumber) => {
    //     const { data } = await axios.get(
    //         `http://10.0.2.2:8083/api/users/${phoneNumber}`,
    //     );
    //     return data;
    // };

    // return { fetchUserByPhoneNumber };
    const fetchUserByPhoneNumber = async (phoneNumber) => {
        try {
            const { data } = await axios.get(
                `http://10.0.2.2:8087/api/users/${phoneNumber}`,
            );
            return data;
        } catch (error) {
            throw error;
        }
    };

    return {
        fetchUserByPhoneNumber,
        login,
        logout,
        getUserInfo,
        getTokenFromStorage,
    };
};

export default AuthService;
