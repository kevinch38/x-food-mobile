import axios from "axios";
import axiosInstance from "../api/axiosInstance";

const PromotionService = () => {

    const getPromotions = async () => {
        try {
            const { data } = await axiosInstance.get(
                `http://10.0.2.2:8087/api/promotions/active`,
            );
            return data;
        } catch (error) {
            throw error;
        }
    };

    const getPromotionById = async (id) => {
        try {
            const { data } = await axiosInstance.get(`http://10.0.2.2:8087/api/promotions/${id}`);
            return data;
        } catch (error) {
            throw error;
        }
    };

    return {
        getPromotions,
        getPromotionById
    }
}

export default PromotionService


