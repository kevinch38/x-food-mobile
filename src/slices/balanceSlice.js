import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import RequestHelper from '../services/RequestHelper';

export const fetchBalanceAction = createAsyncThunk(
    'balance/fetchBalance',
    RequestHelper,
);

const balanceSlice = createSlice({
    name: 'balance',
    initialState: {
        balance: '',
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBalanceAction.fulfilled, (state, { payload }) => {
            if (payload) {
                state.balance = payload.data;
            }
        });
    },
});

export default balanceSlice;
