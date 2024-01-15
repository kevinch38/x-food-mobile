import axios from 'axios';
import token from './Token';

const LoyaltyPointService = () => {
    const fetchLoyaltyPointById = async (loyaltyPointID) => {
        const { data } = await axios.get(
            `http://10.0.2.2:8087/api/loyalty-points/${loyaltyPointID}`,
            {
                headers: {
                    Authorization: token,
                },
            },
        );
        return data;
    };
    return { fetchLoyaltyPointById };
};

export default LoyaltyPointService;
