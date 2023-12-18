import axios from "axios";
const PinCreationService = async (pinValue) => {
    try {
        const response = await axios.put(`http://10.0.2.2:8087/api/pins`, {
            pinValue : pinValue
        });
        return response.data;
    }catch (error) {
        throw error;
    }
}
export default PinCreationService
