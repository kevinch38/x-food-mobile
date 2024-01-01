import axios from 'axios';

const UserService = () => {
    const register = async (user) => {
        try {
            const data = await axios.post(
                `http://10.0.2.2:8087/api/users/register`,
                user,
            );
            return data;
        } catch (error) {
            throw error.data || error;
        }
    };
    const fetchUserById = async (id) => {
        const { data } = await axios.get(
            `http://10.0.2.2:8087/api/users/${id}`,
        );
        return data;
    };

    const fetchUserByPhoneNumber = async (phoneNumber) => {
        const { data } = await axios.get(
            `http://10.0.2.2:8087/api/users/${phoneNumber}`,
        );
        return data;
    };

    const updateUser = async (user) => {
        try {
            const { data } = await axios.put(
                `http://10.0.2.2:8087/api/users`,
                user,
            );
            return data;
        } catch (error) {
            throw error.data || error;
        }
    };

    return {
        fetchUserByPhoneNumber,
        updateUser,
        register,
        fetchUserById,
    };
};

export default UserService;
