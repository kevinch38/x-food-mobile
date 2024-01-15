import axios from 'axios';
import axiosInstance from '../api/axiosInstance';

const MerchantService = () => {
    const fetchMerchants = async () => {
        const { data } = await axiosInstance.get(
            `http://10.0.2.2:8087/api/merchants/active`,
        );
        return data;
    };

    const fetchMerchantById = async (id) => {
        const { data } = await axiosInstance.get(
            `http://10.0.2.2:8087/api/merchants/${id}`,
        );
        return data;
    };

    return { fetchMerchants, fetchMerchantById };
};

export default MerchantService;
