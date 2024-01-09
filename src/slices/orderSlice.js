import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import RequestHelper from '../services/RequestHelper';

export const completeOrderAction = createAsyncThunk(
    'order/completeAction',
    RequestHelper,
);

export const createOrderAction = createAsyncThunk(
    'order/createOrderAction',
    RequestHelper,
);

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        order: null,
        updatedOrder: null,
    },
    extraReducers: (builder) => {
        builder.addCase(createOrderAction.fulfilled, (state, { payload }) => {
            if (payload) {
                // console.log(payload, 'data slice order');
                state.order = payload.data;
            }
        });
        builder.addCase(completeOrderAction.fulfilled, (state, { payload }) => {
            if (payload) {
                // console.log(payload.data, 'data slice update order');
                state.updatedOrder = payload.data;
            }
        });
    },
});

export default orderSlice;
