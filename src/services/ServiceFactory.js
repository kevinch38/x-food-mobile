import CityService from './CityService';
import MerchantBranchService from './MerchantBranchService';
import MerchantService from './MerchantService';
import UserService from './UserService';
import LoyaltyPointService from './LoyaltyPointService';
import OrderService from './OrderService';
import PinService from './PinService';
import BalanceService from './BalanceService';
import FriendService from './FriendService';
import SplitBillService from "./SplitBillService";
import AuthService from './AuthService';

const ServiceFactory = () => {
    return {
        userService: UserService(),
        cityService: CityService(),
        orderService: OrderService(),
        merchantService: MerchantService(),
        merchantBranchService: MerchantBranchService(),
        loyaltyPointService: LoyaltyPointService(),
        pinService: PinService(),
        balanceService: BalanceService(),
        friendService: FriendService(),
        authService: AuthService(),
        splitBillService: SplitBillService(),
    };
};

export default ServiceFactory;
