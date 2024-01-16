import axios from "axios";
import axiosInstance from "../api/axiosInstance";
const PinCreationService = async (pinID,pinValue) => {

    try {
        const response = await axiosInstance.put(`http://10.0.2.2:8087/api/pins`, {
            pinID : pinID,
            pin : pinValue
        });
        return response.data;
    }catch (error) {
        throw error;
    }
}
export default PinCreationService
