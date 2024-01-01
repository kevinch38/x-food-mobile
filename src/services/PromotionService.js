import axios from "axios";

const PromotionService = () => {
    const getPromotions = async () => {
        try {
            const { data } = await axios.get(
                `http://10.0.2.2:8087/api/promotions`,
            );
            return data;
        } catch (error) {
            throw error;
        }
    };

    return {
        getPromotions
    }
}

export default PromotionService


