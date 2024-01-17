import axiosInstance from '../api/axiosInstance';
import { apiBaseUrl } from '../api/xfood';

const BalanceService = () => {
    const fetchBalance = async (id) => {
        const { data } = await axiosInstance.get(
            `${apiBaseUrl}/api/balances/${id}`,
            id,
        );
        return data;
    };

    return { fetchBalance };
};

export default BalanceService;
