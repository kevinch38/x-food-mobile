import axios from 'axios';
import axiosInstance from '../api/axiosInstance';

const OrderService = () => {
    const orderItem = async (order) => {
        const { data } = await axiosInstance.post(
            'http://10.0.2.2:8087/api/orders',
            order,
        );
        console.log(data, 'ini service');
        return data;
    };

    const completedOrder = async (order) => {
        const { data } = await axiosInstance.put(
            'http://10.0.2.2:8087/api/orders',
            order,
        );
        return data;
    };

    return { orderItem, completedOrder };
};

export default OrderService;
