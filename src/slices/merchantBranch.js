import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import RequestHelper from '../services/RequestHelper';

export const merchantBranchAction = createAsyncThunk(
    'merchantBranch/fetchMerchantBranch',
    RequestHelper,
);

const merchantBranchSlice = createSlice({
    name: 'merchantBranch',
    initialState: {
        branch: [],
    },
    extraReducers: (builder) => {
        builder.addCase(
            merchantBranchAction.fulfilled,
            (state, { payload }) => {
                if (payload) {
                    state.branch = payload.data;
                }
            },
        );
    },
});

export default merchantBranchSlice;
