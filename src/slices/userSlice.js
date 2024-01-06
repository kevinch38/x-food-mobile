import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from '../services/AuthService';
import RequestHelper from '../services/RequestHelper';

export const userAction = createAsyncThunk('user/addUser', RequestHelper);
export const selectUserAction = createAsyncThunk(
    'user/selectUser',
    RequestHelper,
);

export const userRegisterAction = createAsyncThunk(
    'user/registerAction',
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
        users: {},
        selectedUser: null,
        registerUser: null,
    },
    extraReducers: (builder) => {
        builder.addCase(userAction.fulfilled, (state, { payload }) => {
            if (payload) {
                state.users = payload.data;
            }
        });
        builder.addCase(selectUserAction.fulfilled, (state, { payload }) => {
            if (payload) {
                state.selectedUser = payload;
            }
        });
        builder
            .addCase(userRegisterAction.fulfilled, (state, { payload }) => {
                if (payload) {
                    state.registerUser = payload.data;
                }
            })
            .addCase(userAction.rejected, ({ payload }) => {
                const errorPayload = payload;
                if (
                    errorPayload &&
                    errorPayload.response &&
                    errorPayload.response.status === 409
                ) {
                    alert('Email sudah terpakai');
                } else {
                    alert(errorPayload);
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
                console.error(
                    'Error fetching user by phone number:',
                    action.error.message,
                );
            },
        );
    },
});

export default userSlice;
