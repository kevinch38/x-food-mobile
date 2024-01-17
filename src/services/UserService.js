import axiosInstance from '../api/axiosInstance';
import { apiBaseUrl } from '../api/xfood';

const UserService = () => {
    const register = async (phoneNumber) => {
        try {
            const newUserRequest = {
                phoneNumber: phoneNumber,
            };

            const data = await axiosInstance.post(
                `${apiBaseUrl}/api/users/register`,
                newUserRequest,
            );
            return data;
        } catch (error) {
            throw error.response.data || error;
        }
    };

    const fetchUserById = async (id) => {
        const { data } = await axiosInstance.get(
            `${apiBaseUrl}/api/users/${id}`,
        );
        return data;
    };

    const fetchUserByPhoneNumber = async (phoneNumber) => {
        const { data } = await axiosInstance.get(
            `${apiBaseUrl}/api/users/${phoneNumber}`,
        );
        return data;
    };

    const updateUser = async (user) => {
        try {
            const { data } = await axiosInstance.put(
                `${apiBaseUrl}/api/users`,
                user,
            );
            return data;
        } catch (error) {
            throw error.data || error;
        }
    };

    const fetchPinByPinID = async (pinID) => {
        const { data } = await axiosInstance.get(
            `${apiBaseUrl}/api/pins/${pinID}`,
        );
        return data;
    };

    const ktpCheck = async (ktpID) => {
        const { data } = await axiosInstance.get(
            `${apiBaseUrl}/api/users/ktp/${ktpID}`,
        );
        return data;
    };

    return {
        fetchUserByPhoneNumber,
        updateUser,
        register,
        fetchUserById,
        fetchPinByPinID,
        ktpCheck,
    };
};

export default UserService;
