import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import RequestHelper from '../services/RequestHelper';

export const merchantAction = createAsyncThunk(
    'merchant/fetchMerchant',
    RequestHelper,
);
export const selectedMerchantAction = createAsyncThunk(
    'merchant/selectMerchant',
    RequestHelper,
);

const merchantSlice = createSlice({
    name: 'merchant',
    initialState: {
        merchants: [],
        selectedMerchant: null,
    },
    extraReducers: (builder) => {
        builder.addCase(merchantAction.fulfilled, (state, { payload }) => {
            if (payload) {
                state.merchants = payload.data;
            }
        });
        builder.addCase(
            selectedMerchantAction.fulfilled,
            (state, { payload }) => {
                if (payload) {
                    state.selectedMerchant = payload.data;
                }
            },
        );
    },
});

export default merchantSlice;
