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
    reducers: {
        clearBalance: (state) => {
            state.balance = '';
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBalanceAction.fulfilled, (state, { payload }) => {
            if (payload) {
                state.balance = payload.data;
            }
        });
    },
});

export const { clearBalance } = balanceSlice.actions;
export default balanceSlice;
