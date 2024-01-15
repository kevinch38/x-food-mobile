import axios from 'axios';
import token from './Token';

const MerchantBranchService = () => {
    const fetchMerchantBranchs = async (id) => {
        const { data } = await axios.get(
            `http://10.0.2.2:8087/api/merchants/branches?merchantId=${id}`,
            {
                headers: {
                    Authorization: token,
                },
            },
        );
        return data;
    };

    const fetchMerchantBranchById = async (id) => {
        const { data } = await axios.get(
            `http://10.0.2.2:8087/api/merchants/branches/${id}`,
            {
                headers: {
                    Authorization: token,
                },
            },
        );
        return data;
    };

    return { fetchMerchantBranchs, fetchMerchantBranchById };
};

export default MerchantBranchService;
