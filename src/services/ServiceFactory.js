import CityService from './CityService';
import MerchantBranchService from './MerchantBranchService';
import MerchantService from './MerchantService';
import UserService from './UserService';

const ServiceFactory = () => {
    return {
        userService: UserService(),
        cityService: CityService(),
        merchantService: MerchantService(),
        merchantBranchService: MerchantBranchService(),
    };
};

export default ServiceFactory;
