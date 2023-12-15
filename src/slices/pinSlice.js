import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
});

export const { setPin } = pinSlice.actions;
export default pinSlice.reducer;
