import axios from 'axios';
import token from './Token';

const PromotionService = () => {
    const getPromotions = async () => {
        try {
            const { data } = await axios.get(
                `http://10.0.2.2:8087/api/promotions`,
                {
                    headers: {
                        Authorization: token,
                    },
                },
            );
            return data;
        } catch (error) {
            throw error;
        }
    };

    const getPromotionById = async (id) => {
        try {
            const { data } = await axios.get(
                `http://10.0.2.2:8087/api/promotions/${id}`,
                {
                    headers: {
                        Authorization: token,
                    },
                },
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
