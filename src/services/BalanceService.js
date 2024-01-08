import axios from 'axios';

const BalanceService = () => {
    const fetchBalance = async (id) => {
        const { data } = await axios.get(
            `http://10.0.2.2:8087/api/balances/${id}`,
            id,
        );
        return data;
    };

    return { fetchBalance };
};

export default BalanceService;
