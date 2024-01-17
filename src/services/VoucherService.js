import axiosInstance from '../api/axiosInstance';
import { apiBaseUrl } from '../api/xfood';

const VoucherService = () => {
    const getVoucherByAccountIDAndPromoID = async (accountID, promoID) => {
        try {
            const response = await axiosInstance.get(
                `${apiBaseUrl}/api/vouchers?promotionID=${promoID}&accountID=${accountID}`,
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching order data:', error);
            throw error;
        }
    };

    const createVoucher = async (promotionID, accountID) => {
        try {
            const response = await axiosInstance.post(
                `${apiBaseUrl}/api/vouchers`,
                {
                    promotionID: promotionID,
                    accountID: accountID,
                },
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    };
    return {
        getVoucherByAccountIDAndPromoID,
        createVoucher,
    };
};

export default VoucherService;
