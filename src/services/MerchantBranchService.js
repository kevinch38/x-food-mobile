import axios from 'axios';

const MerchantBranchService = () => {
    const fetchMerchantBranchs = async (id) => {
        const { data } = await axios.get(
            `http://10.0.2.2:8087/api/merchants/branchs/${id}`,
        );
        return data;
    };

    return { fetchMerchantBranchs };
};

export default MerchantBranchService;
