import axios from 'axios';
import token from './Token';

const BalanceService = () => {
    const fetchBalance = async (id) => {
        const { data } = await axios.get(
            `http://10.0.2.2:8087/api/balances/${id}`,
            id,
            {
                headers: {
                    Authorization: token,
                },
            },
        );
        return data;
    };

    return { fetchBalance };
};

export default BalanceService;
