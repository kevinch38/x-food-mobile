import { Provider } from 'react-redux';
import Navigation from './src/router/Navigation';
import setupStore from './store';
import ServiceProvider from './src/context/ServiceContext';
import ServiceFactory from './src/services/ServiceFactory';
import { StatusBar } from 'react-native';
import React from 'react';

const store = setupStore();
const service = ServiceFactory();
export default function App() {
    return (
        <Provider store={store}>
            <StatusBar barStyle={'light-content'} />
            <ServiceProvider service={service}>
                <Navigation />
            </ServiceProvider>
        </Provider>
    );
}
