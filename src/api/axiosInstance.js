import axios from 'axios';
import { AsyncStorage } from 'react-native';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    (config) => {
        const token = AsyncStorage.getItem('token');
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default axiosInstance;