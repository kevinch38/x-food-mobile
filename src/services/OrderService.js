import axios from 'axios';

const OrderService = () => {
    const orderItem = async (order) => {
        const { data } = await axios.post(
            'http://10.0.2.2:8087/api/orders',
            order,
            {
                headers: {
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJYIEZvb2QiLCJzdWIiOiJmZjgwODA4MThjZjIzNGFhMDE4Y2YyMzVkYWY2MDAwZSIsImV4cCI6MTcwNDg4NzU5MywiaWF0IjoxNzA0ODc2NzkzLCJyb2xlIjoiUk9MRV9VU0VSIn0.G240xE3BKrEIxjjjnH5xie_tWfzSXh7O_tkoy7Y2-Vg',
                },
            },
        );
        console.log(data, 'ini service');
        return data;
    };

    const completedOrder = async (order) => {
        const { data } = await axios.put(
            'http://10.0.2.2:8087/api/orders',
            order,
            {
                headers: {
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJYIEZvb2QiLCJzdWIiOiJmZjgwODA4MThjZjIzNGFhMDE4Y2YyMzVkYWY2MDAwZSIsImV4cCI6MTcwNDg4NzU5MywiaWF0IjoxNzA0ODc2NzkzLCJyb2xlIjoiUk9MRV9VU0VSIn0.G240xE3BKrEIxjjjnH5xie_tWfzSXh7O_tkoy7Y2-Vg',
                },
            },
        );
        return data;
    };

    const getOrderById = async (orderId) => {
        const { data } = await axios.get(
            `http://10.0.2.2:8087/api/orders/${orderId}`,
            {
                headers: {
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJYIEZvb2QiLCJzdWIiOiJmZjgwODA4MThjZjIzNGFhMDE4Y2YyMzVkYWY2MDAwZSIsImV4cCI6MTcwNDg4NzU5MywiaWF0IjoxNzA0ODc2NzkzLCJyb2xlIjoiUk9MRV9VU0VSIn0.G240xE3BKrEIxjjjnH5xie_tWfzSXh7O_tkoy7Y2-Vg',
                },
            },
        );
        return data;
    };

    return { orderItem, completedOrder, getOrderById };
};

export default OrderService;
