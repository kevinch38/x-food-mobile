import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import RequestHelper from '../services/RequestHelper';

export const pinAction = createAsyncThunk('pin/getPin', RequestHelper);

const initialState = {
    pin: '',
    pinValue: '',
    confirmPinValue: '',
};

const pinSlice = createSlice({
    name: 'pin',
    initialState,
    reducers: {
        setPin: (state, action) => {
            state.pinValue = action.payload.pinValue;
            state.confirmPinValue = action.payload.confirmPinValue;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(pinAction.fulfilled, (state, { payload }) => {
            if (payload) {
                state.pin = payload.data;
            }
        });
    },
});

export const { setPin } = pinSlice.actions;
export default pinSlice.reducer;
