import axios from 'axios';

const OrderService = () => {
    const orderItem = async (order) => {
        const { data } = await axios.post(
            'http://localhost:8087/api/orders',
            order,
        );
        return data;
    };

    return { orderItem };
};

export default OrderService;
