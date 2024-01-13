import axios from "axios";

const PromotionService = () => {
    const apiKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJYIEZvb2QiLCJzdWIiOiJmZjgwODE4MThjZjI2MzcwMDE4Y2YyNjU5YjA2MDAwNCIsImV4cCI6MTcwNjM2MzYzMSwiaWF0IjoxNzA1MTU0MDMxLCJyb2xlIjoiUk9MRV9VU0VSIn0.OV67eC2U6-RG5SDSQa2ZqqX2n9SfuVcVSPLxbLwEmSY"

    const getPromotions = async () => {
        try {
            const { data } = await axios.get(
                `http://10.0.2.2:8087/api/promotions`,
                {
                    headers : {
                        'Authorization' : apiKey
                    }
                }
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
                    headers : {
                        'Authorization' : apiKey
                    }
                }
            );
            return data;
        }catch (error) {
            throw error;
        }
    }

    return {
        getPromotions,
        getPromotionById
    }
}

export default PromotionService


