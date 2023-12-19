import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import RequestHelper from '../services/RequestHelper';

export const cityAction = createAsyncThunk('city/fetchCity', RequestHelper);

const citySlice = createSlice({
    name: 'city',
    initialState: {
        cities: [],
    },
    extraReducers: (builder) => {
        builder.addCase(cityAction.fulfilled, (state, { payload }) => {
            if (payload) {
                state.cities = payload.data;
            }
        });
    },
});

export default citySlice;
