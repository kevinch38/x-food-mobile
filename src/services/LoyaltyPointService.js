import axios from 'axios';
import axiosInstance from '../api/axiosInstance';

const LoyaltyPointService = () => {
    const fetchLoyaltyPointById = async (loyaltyPointID) => {
        const { data } = await axiosInstance.get(
            `http://10.0.2.2:8087/api/loyalty-points/${loyaltyPointID}`,
        );
        return data;
    };
    return { fetchLoyaltyPointById };
};

export default LoyaltyPointService;
