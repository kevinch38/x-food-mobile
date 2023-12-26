import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import RequestHelper from '../services/RequestHelper';

export const merchantBranchAction = createAsyncThunk(
    'merchantBranch/fetchMerchantBranch',
    RequestHelper,
);
export const selectedMerchantBranchAction = createAsyncThunk(
    'merchantBranch/selectedMerchantBranch',
    RequestHelper,
);

const merchantBranchSlice = createSlice({
    name: 'merchantBranch',
    initialState: {
        branchs: [],
        selectedBranch: null,
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
        builder.addCase(
            selectedMerchantBranchAction.fulfilled,
            (state, { payload }) => {
                if (payload) {
                    state.selectedBranch = payload.data;
                }
            },
        );
    },
});

export default merchantBranchSlice;
