import axios from 'axios';

const MerchantService = () => {
    const fetchMerchants = async () => {
        const { data } = await axios.get(
            `http://10.0.2.2:8087/api/merchants?paging=true`,
        );
        return data;
    };

    const fetchMerchantById = async (id) => {
        const { data } = await axios.get(
            `http://10.0.2.2:8087/api/merchants/${id}`,
        );
        return data;
    };

    return { fetchMerchants, fetchMerchantById };
};

export default MerchantService;
