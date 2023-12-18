import axios from "axios";
import navigation from "../router/Navigation";
import {useNavigation} from "@react-navigation/native";

const CheckOTP = async (enteredCode, setIsValidCode) => {
    const navigation = useNavigation();
    try {
        const response = await axios.get('http://10.0.2.2:8087/api/otp');
        const data = response.data;

        if (enteredCode === data.data.otp) {
            setIsValidCode(true);
            navigation.navigate('Register');
        } else {
            setIsValidCode(false);
        }
    } catch (error) {
        console.error('Error fetching OTP data:', error);
    }
};

export default CheckOTP;
