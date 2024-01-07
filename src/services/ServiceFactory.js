import CityService from './CityService';
import MerchantBranchService from './MerchantBranchService';
import MerchantService from './MerchantService';
import UserService from './UserService';
import LoyaltyPointService from './LoyaltyPointService';
import OrderService from './OrderService';
import PinService from './PinService';

const ServiceFactory = () => {
    return {
        userService: UserService(),
        cityService: CityService(),
        orderService: OrderService(),
        merchantService: MerchantService(),
        merchantBranchService: MerchantBranchService(),
        loyaltyPointService: LoyaltyPointService(),
        pinService: PinService(),
    };
};

export default ServiceFactory;
