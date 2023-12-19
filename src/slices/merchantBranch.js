import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import RequestHelper from '../services/RequestHelper';

export const merchantBranchAction = createAsyncThunk(
    'merchantBranch/fetchMerchantBranch',
    RequestHelper,
);

const merchantBranchSlice = createSlice({
    name: 'merchantBranch',
    initialState: {
        branchs: [],
    },
    extraReducers: (builder) => {
        builder.addCase(
            merchantBranchAction.fulfilled,
            (state, { payload }) => {
                if (payload) {
                    state.branchs = payload.data;
                }
            },
        );
    },
});

export default merchantBranchSlice;
