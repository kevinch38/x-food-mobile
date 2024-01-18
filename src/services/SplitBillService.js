import axiosInstance from '../api/axiosInstance';
import { apiBaseUrl } from '../api/xfood';

const SplitBillService = () => {
    const saveSplitBill = async (requestPayment) => {
        try {
            const { data } = await axiosInstance.post(
                `${apiBaseUrl}/api/payments`,
                requestPayment,
            );
            return data;
        } catch (e) {
            throw e.data || e;
        }
    };

    return { saveSplitBill };
};

export default SplitBillService;
