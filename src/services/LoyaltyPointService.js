import axios from 'axios';

const LoyaltyPointService = () => {
    const fetchLoyaltyPointById = async (loyaltyPointID) => {
        const { data } = await axios.get(
            `http://10.0.2.2:8087/api/loyalty-points/${loyaltyPointID}`,
        );
        return data;
    };
    return { fetchLoyaltyPointById };
};

export default LoyaltyPointService;
