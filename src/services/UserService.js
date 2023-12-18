import axios from 'axios';

export const register = async (user) => {
    const { data } = await axios.post(
        `http://localhost:8080/api/users/register`,
        user,
    );
    return data;
};

const UserService = () => {
    const fetchUserByPhoneNumber = async (phoneNumber) => {
        const { data } = await axios.get(
            `http://10.0.2.2:8082/api/users/${phoneNumber}`,
        );
        return data;
    };

    const updateUser = async (user) => {
        const { data } = await axios.put(
            `http://10.0.2.2:8082/api/users`,
            user,
        );
        return data;
    };

    return {
        fetchUserByPhoneNumber,
        updateUser,
    };
};

export default UserService;
