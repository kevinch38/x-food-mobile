import CityService from './CityService';
import MerchantBranchService from './MerchantBranchService';
import MerchantService from './MerchantService';
import UserService from './UserService';
import LoyaltyPointService from './LoyaltyPointService';

const ServiceFactory = () => {
    return {
        userService: UserService(),
        cityService: CityService(),
        merchantService: MerchantService(),
        merchantBranchService: MerchantBranchService(),
        loyaltyPointService: LoyaltyPointService(),
    };
};

export default ServiceFactory;
