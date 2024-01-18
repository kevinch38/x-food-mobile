import axiosInstance from '../api/axiosInstance';
import { apiBaseUrl } from '../api/xfood';

const PromotionService = () => {
    const getPromotions = async () => {
        try {
            const { data } = await axiosInstance.get(
                `${apiBaseUrl}/api/promotions/active`,
            );
            return data;
        } catch (error) {
            throw error;
        }
    };

    const getPromotionById = async (id) => {
        try {
            const { data } = await axiosInstance.get(
                `${apiBaseUrl}/api/promotions/${id}`,
            );
            return data;
        } catch (error) {
            throw error;
        }
    };

    return {
        getPromotions,
        getPromotionById,
    };
};

export default PromotionService;
