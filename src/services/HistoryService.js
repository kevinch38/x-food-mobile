import axios from 'axios';

const HistoryService = () => {
    const getAllOrderByAccountId = async (id) => {
        try {
            const response = await axios.get(
                `http://10.0.2.2:8087/api/orders?accountID=${id}`,
                {
                    headers: {
                        Authorization:
                            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJYIEZvb2QiLCJzdWIiOiJmZjgwODA4MThjZjIzNGFhMDE4Y2YyMzVkYWY2MDAwZSIsImV4cCI6MTcwNDg4NzU5MywiaWF0IjoxNzA0ODc2NzkzLCJyb2xlIjoiUk9MRV9VU0VSIn0.G240xE3BKrEIxjjjnH5xie_tWfzSXh7O_tkoy7Y2-Vg',
                    },
                },
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching order data:', error);
            throw error;
        }
    };

    const getAllPaymentHistoryByAccountId = async (id) => {
        try {
            const response = await axios.get(
                `http://10.0.2.2:8087/api/payments?accountID=${id}`,
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
    };
};

export default HistoryService;
