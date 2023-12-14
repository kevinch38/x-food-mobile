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

    const updateUser = async (newUser) => {
        const formData = new FormData();
        formData.append('accountID', newUser.accountID);
        formData.append('ktpID', newUser.ktpID);
        formData.append('accountEmail', newUser.accountEmail);
        formData.append('phoneNumber', newUser.phoneNumber);
        formData.append('pinID', newUser.pinID);
        formData.append('createdAt', newUser.createdAt);
        formData.append('firstName', newUser.firstName);
        formData.append('lastName', newUser.lastName);
        formData.append('dateOfBirth', newUser.dateOfBirth);
        formData.append('updatedAt', newUser.updatedAt);
        formData.append('balanceID', newUser.balanceID);
        formData.append('loyaltyPointID', newUser.loyaltyPointID);
        formData.append('otpID', newUser.otpID);
        const { data } = await axios.put(
            `http://10.0.2.2:8082/api/users`,
            formData,
        );
        return data;
    };

    return {
        fetchUserByPhoneNumber,
        updateUser,
    };
};

export default UserService;
