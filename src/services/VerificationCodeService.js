import axios from "axios";
import navigation from "../router/Navigation";
import {useNavigation} from "@react-navigation/native";

const CheckOTP = async (enteredCode, setIsValidCode) => {
    const apiKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJYIEZvb2QiLCJzdWIiOiJmZjgwODE4MThjZjI2MzcwMDE4Y2YyNjU5YjA2MDAwNCIsImV4cCI6MTcwNjM2MzYzMSwiaWF0IjoxNzA1MTU0MDMxLCJyb2xlIjoiUk9MRV9VU0VSIn0.OV67eC2U6-RG5SDSQa2ZqqX2n9SfuVcVSPLxbLwEmSY"

    const navigation = useNavigation();
    try {
        const response = await axios.get('http://10.0.2.2:8087/api/otp', {
            headers : {
                'Authorization' : apiKey
            }
        });
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
