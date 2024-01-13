import axios from 'axios';

const UserService = () => {
    const apiKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJYIEZvb2QiLCJzdWIiOiJmZjgwODE4MThjZjI2MzcwMDE4Y2YyNjU5YjA2MDAwNCIsImV4cCI6MTcwNjM2MzYzMSwiaWF0IjoxNzA1MTU0MDMxLCJyb2xlIjoiUk9MRV9VU0VSIn0.OV67eC2U6-RG5SDSQa2ZqqX2n9SfuVcVSPLxbLwEmSY"

    const register = async (phoneNumber) => {
        try {
            const newUserRequest = {
                phoneNumber: phoneNumber,
            };

            const data = await axios.post(
                'http://10.0.2.2:8087/api/users/register',
                newUserRequest,
                {
                    headers : {
                        'Authorization' : apiKey
                    }
                }
            );
            return data;
        } catch (error) {
            throw error.response.data || error;
        }
    };

    const fetchUserById = async (id) => {
        const { data } = await axios.get(
            `http://10.0.2.2:8087/api/users/${id}`,
            {
                headers : {
                    'Authorization' : apiKey
                }
            }
        );
        return data;
    };

    const fetchUserByPhoneNumber = async (phoneNumber) => {
        const { data } = await axios.get(
            `http://10.0.2.2:8087/api/users/${phoneNumber}`,
            {
                headers : {
                    'Authorization' : apiKey
                }
            }
        );
        return data;
    };

    const updateUser = async (user) => {
        try {
            const { data } = await axios.put(
                `http://10.0.2.2:8087/api/users`,
                user,
                {
                    headers : {
                        'Authorization' : apiKey
                    }
                }
            );
            return data;
        } catch (error) {
            throw error.data || error;
        }
    };

    const fetchPinByPinID = async (pinID) => {
        const { data } = await axios.get(
            `http://10.0.2.2:8087/api/pins/${pinID}`,
            {
                headers : {
                    'Authorization' : apiKey
                }
            }
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
