import axios from 'axios';

const OrderService = () => {
    const orderItem = async (order) => {
        const { data } = await axios.post(
            'http://10.0.2.2:8087/api/orders',
            order,
        );
        console.log(data, 'ini service');
        return data;
    };

    const completedOrder = async (order) => {
        const { data } = await axios.put(
            'http://10.0.2.2:8087/api/orders',
            order,
        );
        return data;
    };

    return { orderItem, completedOrder };
};

export default OrderService;
