import axios from "axios";
import token from "./Token";

const SplitBillService = () => {
    const saveSplitBill = async (requestPayment) => {

        try {
            const {data} = await axios.post('http://10.0.2.2:8087/api/payments',
                requestPayment,
                {
                    headers: {
                        Authorization: token,
                    },
                },)
            return data;
        } catch (e) {
            throw e.data || e;
        }
    }

    return {saveSplitBill}
}

export default SplitBillService
