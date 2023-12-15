import axios from "axios";
const PinCreationService = async (pinValue) => {
    try {
        const response = await axios.put(`${BASE_URL}/pins`, {
            pinValue : pinValue
        });
        return response.data;
    }catch (error) {
        throw error;
    }
}
export default PinCreationService
