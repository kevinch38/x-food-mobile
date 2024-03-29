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
export const selectUserByPhoneNumberAction = createAsyncThunk(
    'user/selectUserByPhoneNumber',
    RequestHelper,
);


export const checkKtpAction = createAsyncThunk('user/checkKtp', RequestHelper);
const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: {},
        selectedUser: null,
        registerUser: null,
        checkKtp: '',
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
            .addCase(userRegisterAction.rejected, ({ payload }) => {
                const errorPayload = payload;
                if (
                    errorPayload &&
                    errorPayload.response &&
                    errorPayload.response.status === 409
                ) {
                    console.log(`we're sorry, that email taken`);
                } else {
                    alert(errorPayload);
                    // console.log(errorPayload, 'error slice payload');
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
        builder.addCase(checkKtpAction.fulfilled, (state, { payload }) => {
            if (payload) {
                state.checkKtp = payload.data;
            }
        });
    },
});

export default userSlice;
