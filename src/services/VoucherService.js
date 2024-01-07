import axios from "axios";

const VoucherService = () => {
    const getVoucherByAccountIDAndPromoID = async (accountID, promoID) => {
        try {
            const response = await axios.get(`http://10.0.2.2:8087/api/vouchers?promotionID=${promoID}&accountID=${accountID}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching order data:", error);
            throw error;
        }
    }


    const createVoucher = async (promotionID, accountID) => {
        try {
            const response = await axios.post(`http://10.0.2.2:8087/api/vouchers`, {
                promotionID : promotionID,
                accountID : accountID,
            });
            return response.data;
        }catch (error) {
            throw error;
        }
    }
    return{
        getVoucherByAccountIDAndPromoID,
        createVoucher
    }
};

export default VoucherService;
