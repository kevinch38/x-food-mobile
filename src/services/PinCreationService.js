import axios from 'axios';
import token from './Token';
const PinCreationService = async (pinID, pinValue) => {
    try {
        const response = await axios.put(
            `http://10.0.2.2:8087/api/pins`,
            {
                pinID: pinID,
                pin: pinValue,
            },
            {
                headers: {
                    Authorization: token,
                },
            },
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
export default PinCreationService;
