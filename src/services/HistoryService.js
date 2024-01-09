import axios from "axios";

const HistoryService = () => {
    const getAllOrderByAccountId = async (id) => {
        try {
            const response = await axios.get(`http://10.0.2.2:8087/api/orders?accountID=${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching order data:", error);
            throw error;
        }
    }

    const getAllPaymentHistoryByAccountId = async (id) => {
        try {
            const response = await axios.get(`http://10.0.2.2:8087/api/payments?accountID=${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching order data:", error);
            throw error;
        }
    }
    return{
        getAllOrderByAccountId,
        getAllPaymentHistoryByAccountId
    }
};

export default HistoryService;
