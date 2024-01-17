import axiosInstance from '../api/axiosInstance';
import { apiBaseUrl } from '../api/xfood';

const MerchantService = () => {
    const fetchMerchants = async () => {
        const { data } = await axiosInstance.get(
            `${apiBaseUrl}/api/merchants/active`,
        );
        return data;
    };

    const fetchMerchantById = async (id) => {
        const { data } = await axiosInstance.get(
            `${apiBaseUrl}/api/merchants/${id}`,
        );
        return data;
    };

    return { fetchMerchants, fetchMerchantById };
};

export default MerchantService;
