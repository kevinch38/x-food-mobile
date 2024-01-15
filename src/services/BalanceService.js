import axiosInstance from '../api/axiosInstance';

const BalanceService = () => {
    const fetchBalance = async (id) => {
        const { data } = await axiosInstance.get(
            `http://10.0.2.2:8087/api/balances/${id}`,
            id
        );
        return data;
    };

    return { fetchBalance };
};

export default BalanceService;
