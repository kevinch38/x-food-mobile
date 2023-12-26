import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ServiceContext } from '../../src/context/ServiceContext';
import Profile from '../../src/screens/Profile';

const mockStore = jest.fn();

const mockUserContext = {
    storeUser: mockStore,
};
const renderWithProvider = (component) => {
    return render(
        <ServiceContext.Provider value={mockUserContext}>
            {component}
        </ServiceContext.Provider>,
    );
};

describe('Profile Component', () => {
    test('renders correctly', () => {
        const { getByPlaceholderText, getByText } = renderWithProvider(
            <Profile />,
        );
        expect(getByText('Arlan Ariandi')).toBeTruthy();
    });
});
