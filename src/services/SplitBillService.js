import axios from 'axios';
import token from './Token';
import axiosInstance from '../api/axiosInstance';

const SplitBillService = () => {
    const saveSplitBill = async (requestPayment) => {
        try {
            const { data } = await axiosInstance.post(
                'http://10.0.2.2:8087/api/payments',
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
