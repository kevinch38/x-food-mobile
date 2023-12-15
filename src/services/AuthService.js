import axios from "axios";

const AuthService = () => {
  const fetchUserByPhoneNumber = async (phoneNumber) => {
    const { data } = await axios.get(
      `http://10.0.2.2:8083/api/merchants/${phoneNumber}`
    );
    return data;
  };

  return { fetchUserByPhoneNumber };
};

export default AuthService;
