import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import RequestHelper from '../services/RequestHelper';

export const loyaltyPointAction = createAsyncThunk(
    'loyaltyPoint/fetchLoyaltyPoint',
    RequestHelper,
);

const loyaltyPointSlice = createSlice({
    name: 'loyaltyPoint',
    initialState: {
        loyaltyPoints: [],
    },
    extraReducers: (builder) => {
        builder.addCase(loyaltyPointAction.fulfilled, (state, { payload }) => {
            if (payload) {
                state.loyaltyPoints = payload.data;
            }
        });
    },
});
export default loyaltyPointSlice;
