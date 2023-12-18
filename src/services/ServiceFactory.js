import MerchantService from './MerchantService';
import UserService from './UserService';

const ServiceFactory = () => {
    return {
        userService: UserService(),
        merchantService: MerchantService(),
    };
};

export default ServiceFactory;
