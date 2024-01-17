import axiosInstance from '../api/axiosInstance';
import { apiBaseUrl } from '../api/xfood';
const PinCreationService = async (pinID, pinValue) => {
    try {
        const response = await axiosInstance.put(`${apiBaseUrl}/api/pins`, {
            pinID: pinID,
            pin: pinValue,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export default PinCreationService;
