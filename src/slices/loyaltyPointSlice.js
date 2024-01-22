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
    reducers: {
        clearLoyaltyPoint: (state) => {
            state.loyaltyPoints = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loyaltyPointAction.fulfilled, (state, { payload }) => {
            if (payload) {
                state.loyaltyPoints = payload.data;
            }
        });
    },
});

export const { clearLoyaltyPoint } = loyaltyPointSlice.actions;
export default loyaltyPointSlice;
