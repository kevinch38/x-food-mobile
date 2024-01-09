import axios from 'axios';

const PinService = () => {
    const getPin = async (id) => {
        const { data } = await axios.get(`http://10.0.2.2:8087/api/pins/${id}`);
        return data;
    };

    const pinCheck = async (user) => {
        const { data } = await axios.post(
            `http://10.0.2.2:8087/api/pins`,
            user,
        );
        return data;
    };

    return { getPin, pinCheck };
};

export default PinService;
