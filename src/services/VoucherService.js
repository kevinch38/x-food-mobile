import axiosInstance from '../api/axiosInstance';

const VoucherService = () => {
    const getVoucherByAccountIDAndPromoID = async (accountID, promoID) => {
        try {
            const response = await axiosInstance.get(
                `http://10.0.2.2:8087/api/vouchers?promotionID=${promoID}&accountID=${accountID}`,
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
                `http://10.0.2.2:8087/api/vouchers`,
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

    const deleteVoucher = async (voucherID) => {
        try {
            const response = await axiosInstance.delete(
                `http://10.0.2.2:8087/api/vouchers/${voucherID}`,
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching order data:', error);
            throw error;
        }
    };

    return {
        getVoucherByAccountIDAndPromoID,
        createVoucher,
        deleteVoucher,
    };
};

export default VoucherService;
