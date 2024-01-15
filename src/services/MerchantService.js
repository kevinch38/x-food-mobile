import axios from 'axios';
import token from './Token';

const MerchantService = () => {
    const fetchMerchants = async () => {
        const { data } = await axios.get(
            `http://10.0.2.2:8087/api/merchants/active`,
            {
                headers: {
                    Authorization: token,
                },
            },
        );
        return data;
    };

    const fetchMerchantById = async (id) => {
        const { data } = await axios.get(
            `http://10.0.2.2:8087/api/merchants/${id}`,
            {
                headers: {
                    Authorization: token,
                },
            },
        );
        return data;
    };

    return { fetchMerchants, fetchMerchantById };
};

export default MerchantService;
