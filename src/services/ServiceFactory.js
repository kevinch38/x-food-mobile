import UserService from './UserService';

const ServiceFactory = () => {
    return {
        userService: UserService(),
    };
};

export default ServiceFactory;
