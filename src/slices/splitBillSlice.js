import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import RequestHelper from "../services/RequestHelper";

export const splitBillAction = createAsyncThunk('splitBill/addSplitBill', RequestHelper)

export const splitBillSlice = createSlice({
    name: 'splitBill',
    initialState: {
        splitBills: [],
    },
    extraReducers: (builder) => {
        builder.addCase(splitBillAction.fulfilled, (state, {payload}) => {
            if (payload) {
                state.splitBills = payload.data;
            }
        });
    }
})

export default splitBillSlice;
