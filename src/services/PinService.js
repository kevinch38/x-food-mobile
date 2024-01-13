import axios from 'axios';
import token from './Token';

const PinService = () => {
    const getPin = async (id) => {
        const { data } = await axios.get(`http://10.0.2.2:8087/api/pins/${id}`);
        return data;
    };

    const pinCheck = async (user) => {
        const { data } = await axios.post(
            `http://10.0.2.2:8087/api/pins`,
            user,
            {
                headers: {
                    Authorization: token,
                },
            },
        );
        return data;
    };

    return { getPin, pinCheck };
};

export default PinService;
