import axiosInstance from '../api/axiosInstance';

const PinService = () => {
    const getPin = async (id) => {
        const { data } = await axiosInstance.get(`http://10.0.2.2:8087/api/pins/${id}`);
        return data;
    };

    const pinCheck = async (user) => {
        const { data } = await axiosInstance.post(
            `http://10.0.2.2:8087/api/pins`,
            user,
        );
        return data;
    };

    const updatePin = async (user) => {
        const {data} = await axiosInstance.put(
            `http://10.0.2.2:8087/api/pins`,
            user,
        );

        return data;
    }

    return { getPin, pinCheck, updatePin };
};

export default PinService;
