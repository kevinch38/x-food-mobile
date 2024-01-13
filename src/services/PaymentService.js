import axios from 'axios';

const Payment = () => {
    const completePaymentSplit = async (id) => {
        const { data } = await axios.put(
            `http://10.0.2.2:8087/api/payments/${id}`,
        );
        return data;
    };

    return { completePaymentSplit };
};

export default Payment;
