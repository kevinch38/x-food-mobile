import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../api/axiosInstance';
import { apiBaseUrl } from '../api/xfood';

const CheckOTP = async (enteredCode, setIsValidCode) => {
    const navigation = useNavigation();
    try {
        const response = await axiosInstance.get(`${apiBaseUrl}/api/otp`);
        const data = response.data;

        if (enteredCode === data.data.otp) {
            setIsValidCode(true);
            navigation.navigate('Register');
        } else {
            setIsValidCode(false);
        }
    } catch (error) {
        console.error('Error fetching OTP data:', error);
    }

    const logout = () => {
        AsyncStorage.removeItem(TOKEN_KEY);
    };

    const getTokenFromStorage = () => {
        return AsyncStorage.getItem(TOKEN_KEY);
    };

    const setTokenFromStorage = (token) => {
        return AsyncStorage.setItem(TOKEN_KEY, token);
    };
};

export default CheckOTP;
