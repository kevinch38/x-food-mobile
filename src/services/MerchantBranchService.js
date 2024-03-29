import axios from 'axios';
import axiosInstance from '../api/axiosInstance';

const MerchantBranchService = () => {
    const fetchMerchantBranchs = async (id) => {
        const { data } = await axiosInstance.get(
            `http://10.0.2.2:8087/api/merchants/branches?merchantId=${id}`,
        );
        return data;
    };

    const fetchMerchantBranchById = async (id) => {
        const { data } = await axiosInstance.get(
            `http://10.0.2.2:8087/api/merchants/branches/${id}`,
        );
        return data;
    };

    return { fetchMerchantBranchs, fetchMerchantBranchById };
};

export default MerchantBranchService;
