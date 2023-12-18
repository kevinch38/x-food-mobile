import axios from 'axios';

const AuthService = () => {
    // const fetchUserByPhoneNumber = async (phoneNumber) => {
    //     const { data } = await axios.get(
    //         `http://10.0.2.2:8083/api/users/${phoneNumber}`,
    //     );
    //     return data;
    // };

    // return { fetchUserByPhoneNumber };
    const fetchUserByPhoneNumber = async (phoneNumber) => {
        try {
            const { data } = await axios.get(
                `http://10.0.2.2:8083/api/users/${phoneNumber}`,
            );
            return data;
        } catch (error) {
            throw error;
        }
    };

    return { fetchUserByPhoneNumber };
};

export default AuthService;
