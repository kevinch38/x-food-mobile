import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        error: null,
        errorKey: 0,
        isLoading: false,
        phoneNumber: '',
    },
    reducers: {
        loading: (state) => {
            state.isLoading = true;
        },
        success: (state) => {
            state.isLoading = false;
        },
        error: (state, { payload }) => {
            state.isLoading = false;
            state.errorKey += 1;
            if (
                payload.response &&
                payload.response.data &&
                payload.response.data.message
            ) {
                state.error = payload.response.data.message;
            } else if (typeof payload === 'string') {
                state.error = payload;
            } else {
                state.error = 'An unknown error occurred.';
            }
        },
        finish: (state) => {
            state.isLoading = false;
            state.phoneNumber = '';
        },
        setPhoneNumber: (state, { payload }) => {
            state.phoneNumber = payload;
        },
    },
});

export const { loading, success, finish, error, setPhoneNumber } =
    uiSlice.actions;
export default uiSlice;
