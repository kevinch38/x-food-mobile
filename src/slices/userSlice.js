import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import RequestHelper from '../services/RequestHelper';
import { register } from '../services/UserService';

export const userAction = createAsyncThunk('user/addUser', RequestHelper);
export const selectUserAction = createAsyncThunk(
    'user/selectUser',
    RequestHelper,
);

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (payload, { rejectWithValue }) => {
        console.log('onAction', payload);
        try {
            const response = await register(payload);
            return response.data;
        } catch (error) {
            if (!error.response) {
                return rejectWithValue({ message: error.message });
            }
            return rejectWithValue({
                message: error.response.data.message,
                status: error.response.status,
            });
        }
    },
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        selectedUser: null,
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
    },
});

export default userSlice;
