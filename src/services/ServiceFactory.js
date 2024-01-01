import CityService from './CityService';
import MerchantBranchService from './MerchantBranchService';
import MerchantService from './MerchantService';
import UserService from './UserService';
import OrderService from './OrderService';

const ServiceFactory = () => {
    return {
        userService: UserService(),
        cityService: CityService(),
        merchantService: MerchantService(),
        merchantBranchService: MerchantBranchService(),
        orderService: OrderService(),
    };
};

export default ServiceFactory;
