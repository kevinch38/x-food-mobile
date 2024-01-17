import axiosInstance from '../api/axiosInstance';
import { apiBaseUrl } from '../api/xfood';

const OrderService = () => {
    const orderItem = async (order) => {
        const { data } = await axiosInstance.post(
            `${apiBaseUrl}/api/orders`,
            order,
        );
        return data;
    };

    const completedOrder = async (order) => {
        const { data } = await axiosInstance.put(
            `${apiBaseUrl}/api/orders`,
            order,
        );
        return data;
    };

    const getOrderById = async (orderId) => {
        const { data } = await axiosInstance.get(
            `${apiBaseUrl}/api/orders/${orderId}`,
        );
        return data;
    };

    return { orderItem, completedOrder, getOrderById };
};

export default OrderService;
