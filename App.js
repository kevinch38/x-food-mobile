import { Provider } from 'react-redux';
import Navigation from './src/router/Navigation';
import setupStore from './store';
import ServiceFactory from './src/services/ServiceFactory';
import ServiceProvider from './src/context/ServiceContext';

const store = setupStore();
const service = ServiceFactory();

export default function App() {
    return (
        <Provider store={store}>
            <ServiceProvider service={service}>
                <Navigation />
            </ServiceProvider>
        </Provider>
    );
}
