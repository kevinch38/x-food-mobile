import axiosInstance from '../api/axiosInstance';
import { apiBaseUrl } from '../api/xfood';

const TopUpService = () => {
    const fetchTopUpService = async (id) => {
        const { data } = await axiosInstance.get(
            `${apiBaseUrl}/api/top-up?accountID=${id}`,
        );
        return data;
    };

    return { fetchTopUpService };
};

export default TopUpService;
