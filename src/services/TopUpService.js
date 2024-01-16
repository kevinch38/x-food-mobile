import axiosInstance from '../api/axiosInstance';

const TopUpService = () => {
    const fetchTopUpService = async (id) => {
        const { data } = await axiosInstance.get(
            `http://10.0.2.2:8087/api/top-up?accountID=${id}`
        );
        return data;
    };


    return { fetchTopUpService };
};

export default TopUpService;
