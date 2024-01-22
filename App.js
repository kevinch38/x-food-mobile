import { Provider } from 'react-redux';
import Navigation from './src/router/Navigation';
import setupStore from './store';
import ServiceProvider from './src/context/ServiceContext';
import ServiceFactory from './src/services/ServiceFactory';
import { Appearance, StatusBar } from 'react-native';
import React from 'react';

const store = setupStore();
const service = ServiceFactory();
const colorScheme = Appearance.getColorScheme();
const barStyle = colorScheme === 'dark' ? 'light-content' : 'dark-content';
export default function App() {
    return (
        <Provider store={store}>
            <StatusBar barStyle={barStyle} />
            <ServiceProvider service={service}>
                <Navigation />
            </ServiceProvider>
        </Provider>
    );
}
