import axios from 'axios';
import axiosInstance from '../api/axiosInstance';

const PaymentService = () => {
    const completePaymentSplit = async (id) => {
        const { data } = await axiosInstance.put(
            `http://10.0.2.2:8087/api/payments/${id}`,
        );
        return data;
    };

    return { completePaymentSplit };
};

export default PaymentService;
