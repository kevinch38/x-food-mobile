import axios from "axios";


const UserService = () => {
    const register = async (user) => {
        const data = await axios.post(
            `http://10.0.2.2:8083/api/users/register`,
            user,
        );
        return data;
    };
    const fetchUserById = async (id) => {
        const { data } = await axios.get(
            `http://10.0.2.2:8083/api/users/${id}`,
        );
        return data;
    };

    return { register, fetchUserById };
};

export default UserService;
