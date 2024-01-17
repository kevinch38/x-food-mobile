import axiosInstance from '../api/axiosInstance';
import { apiBaseUrl } from '../api/xfood';

const MerchantBranchService = () => {
    const fetchMerchantBranchs = async (id) => {
        const { data } = await axiosInstance.get(
            `${apiBaseUrl}/api/merchants/branches?merchantId=${id}`,
        );
        return data;
    };

    const fetchMerchantBranchById = async (id) => {
        const { data } = await axiosInstance.get(
            `${apiBaseUrl}/api/merchants/branches/${id}`,
        );
        return data;
    };

    return { fetchMerchantBranchs, fetchMerchantBranchById };
};

export default MerchantBranchService;
