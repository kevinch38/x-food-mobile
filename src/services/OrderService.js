import axios from 'axios';
import axiosInstance from '../api/axiosInstance';

const OrderService = () => {
    const apiKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJYIEZvb2QiLCJzdWIiOiJmZjgwODE4MThjZjI2MzcwMDE4Y2YyNjU5YjA2MDAwNCIsImV4cCI6MTcwNjM2MzYzMSwiaWF0IjoxNzA1MTU0MDMxLCJyb2xlIjoiUk9MRV9VU0VSIn0.OV67eC2U6-RG5SDSQa2ZqqX2n9SfuVcVSPLxbLwEmSY"
    const orderItem = async (order) => {
        const { data } = await axiosInstance.post(
            'http://10.0.2.2:8087/api/orders',
            order, {
                headers : {
                    'Authorization' : apiKey
                }
            }
        );
        console.log(data, 'ini service');
        return data;
    };

    const completedOrder = async (order) => {
        const { data } = await axiosInstance.put(
            'http://10.0.2.2:8087/api/orders',
            order, {
                headers : {
                    'Authorization' : apiKey
                }
            }
        );
        return data;
    };

    const getOrderById = async (orderId) => {
        const {data} = await axios.get(`http://10.0.2.2:8087/api/orders/${orderId}`, {
            headers : {
                'Authorization' : apiKey
            }
        });
        return data;
    }

    return { orderItem, completedOrder, getOrderById };
};

export default OrderService;
