import axiosInstance from '../api/axiosInstance';
import { apiBaseUrl } from '../api/xfood';

const HistoryService = () => {
    const getAllOrderByAccountId = async (id) => {
        try {
            const response = await axiosInstance.get(
                `${apiBaseUrl}/api/orders?accountID=${id}`,
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching order data:', error);
            throw error;
        }
    };

    const getAllPaymentHistoryByAccountId = async (id) => {
        try {
            const response = await axiosInstance.get(
                `${apiBaseUrl}/api/payments?accountID=${id}`,
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching order data:', error);
            throw error;
        }
    };

    const getAllTopUpHistoryByAccountId = async (id) => {
        try {
            const response = await axiosInstance.get(
                `${apiBaseUrl}/api/top-up?accountID=${id}`,
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching order data:', error);
            throw error;
        }
    };
    return {
        getAllOrderByAccountId,
        getAllPaymentHistoryByAccountId,
        getAllTopUpHistoryByAccountId,
    };
};

export default HistoryService;
