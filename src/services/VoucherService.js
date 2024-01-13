import axios from "axios";

const VoucherService = () => {
    const apiKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJYIEZvb2QiLCJzdWIiOiJmZjgwODE4MThjZjI2MzcwMDE4Y2YyNjU5YjA2MDAwNCIsImV4cCI6MTcwNjM2MzYzMSwiaWF0IjoxNzA1MTU0MDMxLCJyb2xlIjoiUk9MRV9VU0VSIn0.OV67eC2U6-RG5SDSQa2ZqqX2n9SfuVcVSPLxbLwEmSY"
    const getVoucherByAccountIDAndPromoID = async (accountID, promoID) => {
        try {
            const response = await axios.get(`http://10.0.2.2:8087/api/vouchers?promotionID=${promoID}&accountID=${accountID}`, {
                headers : {
                    'Authorization' : apiKey
                }
            });
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
            },
                {
                    headers : {
                        'Authorization' : apiKey
                    }
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
