import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from '../services/AuthService';
import RequestHelper from '../services/RequestHelper';

export const userAction = createAsyncThunk(
    'user/registerAction',
    RequestHelper,
);

export const selectedUserAction = createAsyncThunk(
    'userSelectedAction/action',
    RequestHelper,
);

export const selectedUserPhoneNumberAction = createAsyncThunk(
    'user/selectedUserPhoneNumberAction',
    async (phoneNumber) => {
        const authService = AuthService();
        const response = await authService.fetchUserByPhoneNumber(phoneNumber);
        return response;
    },
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        selectedUser: null,
        user: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userAction.fulfilled, (state, { payload }) => {
            if (payload) {
                state.user = payload.data;
            }
        });
        builder.addCase(
            selectedUserPhoneNumberAction.fulfilled,
            (state, { payload }) => {
                if (payload) {
                    state.selectedUserPhoneNumberAction = payload;
                }
            },
        );
        builder.addCase(
            selectedUserPhoneNumberAction.rejected,
            (state, action) => {
                // Handle jika nomor telepon tidak terdaftar
                console.error(
                    'Error fetching user by phone number:',
                    action.error.message,
                );
            },
        );
    },
});

export default userSlice;
