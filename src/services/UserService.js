import axios from 'axios';
import axiosInstance from '../api/axiosInstance';

const UserService = () => {
    const register = async (phoneNumber) => {
        try {
            const newUserRequest = {
                phoneNumber: phoneNumber,
            };

            const data = await axiosInstance.post(
                'http://10.0.2.2:8087/api/users/register',
                newUserRequest,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
            return data;
        } catch (error) {
            throw error.response.data || error;
        }
    };

    const fetchUserById = async (id) => {
        const { data } = await axiosInstance.get(
            `http://10.0.2.2:8087/api/users/${id}`,
        );
        return data;
    };

    const fetchUserByPhoneNumber = async (phoneNumber) => {
        const { data } = await axiosInstance.get(
            `http://10.0.2.2:8087/api/users/${phoneNumber}`,
        );
        return data;
    };

    const updateUser = async (user) => {
        try {
            const { data } = await axiosInstance.put(
                `http://10.0.2.2:8087/api/users`,
                user,
            );
            return data;
        } catch (error) {
            throw error.data || error;
        }
    };

    const fetchPinByPinID = async (pinID) => {
        const { data } = await axiosInstance.get(
            `http://10.0.2.2:8087/api/pins/${pinID}`,
        );
        return data;
    };

    const ktpCheck = async (ktpID) => {
        const { data } = await axiosInstance.get(
            `http://10.0.2.2:8087/api/users/ktp/${ktpID}`,
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
