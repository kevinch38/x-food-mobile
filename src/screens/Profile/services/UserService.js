import axios from 'axios';

export const register = async (user) => {
    const { data } = await axios.post(
        `http://10.0.2.2:8087/api/users/register`,
        user,
    );
    return data;
};

const UserService = () => {
    const fetchUserById = async (id) => {
        const { data } = await axios.get(
            `http://10.0.2.2:8087/api/users/${id}`,
        );
        return data;
    };

    return fetchUserById;
};

export default UserService;
