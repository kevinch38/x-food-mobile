import axios from "axios";

const HistoryService = () => {
    const apiKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJYIEZvb2QiLCJzdWIiOiJmZjgwODE4MThjZjI2MzcwMDE4Y2YyNjU5YjA2MDAwNCIsImV4cCI6MTcwNjM2MzYzMSwiaWF0IjoxNzA1MTU0MDMxLCJyb2xlIjoiUk9MRV9VU0VSIn0.OV67eC2U6-RG5SDSQa2ZqqX2n9SfuVcVSPLxbLwEmSY"

    const getAllOrderByAccountId = async (id) => {
        try {
            const response = await axios.get(`http://10.0.2.2:8087/api/orders?accountID=${id}`, {
                headers : {
                    'Authorization' : apiKey
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching order data:", error);
            throw error;
        }
    }

    const getAllPaymentHistoryByAccountId = async (id) => {
        try {
            const response = await axios.get(`http://10.0.2.2:8087/api/payments?accountID=${id}`, {
                headers : {
                    'Authorization' : apiKey
                }
            });
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
