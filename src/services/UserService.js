import axios from 'axios';

const UserService = () => {
    const register = async (phoneNumber) => {
        try {
            const newUserRequest = {
                phoneNumber: phoneNumber,
            };

            const data = await axios.post(
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
                {
                    headers: {
                        Authorization:
                            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJYIEZvb2QiLCJzdWIiOiJmZjgwODA4MThjZjIzNGFhMDE4Y2YyMzVkYWY2MDAwZSIsImV4cCI6MTcwNDg4NzU5MywiaWF0IjoxNzA0ODc2NzkzLCJyb2xlIjoiUk9MRV9VU0VSIn0.G240xE3BKrEIxjjjnH5xie_tWfzSXh7O_tkoy7Y2-Vg',
                    },
                },
            );
            return data;
        } catch (error) {
            throw error.data || error;
        }
    };

    const fetchPinByPinID = async (pinID) => {
        const { data } = await axios.get(
            `http://10.0.2.2:8087/api/pins/${pinID}`,
        );
        return data;
    };

    return {
        fetchUserByPhoneNumber,
        updateUser,
        register,
        fetchUserById,
        fetchPinByPinID,
    };
};

export default UserService;
