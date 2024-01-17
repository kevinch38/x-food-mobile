import axiosInstance from '../api/axiosInstance';
import { apiBaseUrl } from '../api/xfood';

const PaymentService = () => {
    const completePaymentSplit = async (id) => {
        const { data } = await axiosInstance.put(
            `${apiBaseUrl}/api/payments/${id}`,
        );
        return data;
    };

    return { completePaymentSplit };
};

export default PaymentService;
