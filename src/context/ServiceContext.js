import { createContext } from 'react';

export const ServiceContext = createContext({});

const ServiceProvider = ({ service, children, ...restParams }) => {
    return (
        <ServiceContext.Provider value={service} {...restParams}>
            {children}
        </ServiceContext.Provider>
    );
};
export default ServiceProvider;
