import axiosInstance from '../api/axiosInstance';
import { apiBaseUrl } from '../api/xfood';

const PinService = () => {
    const getPin = async (id) => {
        const { data } = await axiosInstance.get(
            `${apiBaseUrl}/api/pins/${id}`,
        );
        return data;
    };

    const pinCheck = async (user) => {
        const { data } = await axiosInstance.post(
            `${apiBaseUrl}/api/pins`,
            user,
        );
        return data;
    };

    const updatePin = async (user) => {
        const { data } = await axiosInstance.put(
            `${apiBaseUrl}/api/pins`,
            user,
        );

        return data;
    }

    return { getPin, pinCheck, updatePin };
};

export default PinService;
