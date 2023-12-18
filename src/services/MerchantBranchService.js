import axios from 'axios';

const MerchantBranchService = () => {
    const fetchMerchantBranchs = async (id) => {
        const { data } = await axios.get(
            `http://10.0.2.2:8083/api/merchants/branch/${id}`,
        );
        return data;
    };

    return { fetchMerchantBranchs };
};

export default MerchantBranchService;
