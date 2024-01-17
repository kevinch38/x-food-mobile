import axiosInstance from '../api/axiosInstance';
import { apiBaseUrl } from '../api/xfood';

const LoyaltyPointService = () => {
    const fetchLoyaltyPointById = async (loyaltyPointID) => {
        const { data } = await axiosInstance.get(
            `${apiBaseUrl}/api/loyalty-points/${loyaltyPointID}`,
        );
        return data;
    };
    return { fetchLoyaltyPointById };
};

export default LoyaltyPointService;
