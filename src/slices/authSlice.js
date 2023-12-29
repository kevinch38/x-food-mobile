import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import RequestHelper from '../services/RequestHelper';

export const selectedUserPhoneNumberAction = createAsyncThunk(
    'user/selectedUserPhoneNumberAction',
    RequestHelper,
);

export const authAction = createAsyncThunk('auth/login', RequestHelper);

const authSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        selectedUserPhoneNumberAction: null,
        user: null,
    },
    extraReducers: (builder) => {
        builder.addCase(
            selectedUserPhoneNumberAction.fulfilled,
            (state, { payload }) => {
                if (payload) {
                    state.selectedUserPhoneNumberAction = payload;
                }
            },
        );

        builder.addCase(authAction.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.user = payload.data;
            }
        });
    },
});

export default authSlice;
