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
                }
            );
            return data;
        } catch (error) {
            throw error.response.data || error;
        }
    };

    const fetchUserById = async (id) => {
        const { data } = await axios.get(`http://10.0.2.2:8087/api/users/${id}`);
        return data;
    };

    const fetchUserByPhoneNumber = async (phoneNumber) => {
        try {
            const { data } = await axios.get(
                `http://10.0.2.2:8087/api/users/${phoneNumber}`,
                {
                    headers: {
                        'Accept': 'application/json',
                    },
                }
            );
            return data;
        } catch (error) {
            throw error;
        }
    };


    const updateUser = async (user) => {
        const { data } = await axios.put(
            `http://10.0.2.2:8087/api/users`,
            user,
        );
        return data;
    };
    const fetchPinByPinID = async (pinID) => {
        const {data} = await axios.get(
            `http://10.0.2.2:8087/api/pins/${pinID}`
        );

        return data;
    }

    return {
        fetchPinByPinID,
        fetchUserByPhoneNumber,
        updateUser,
        register, 
        fetchUserById,
    };
};

export default UserService;
