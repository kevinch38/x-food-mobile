import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RequestHelper from '../services/RequestHelper';

export const userAction = createAsyncThunk(
    'user/registerAction',
    RequestHelper,
);

export const selectedUserAction = createAsyncThunk(
  "userSelectedAction/action",
  RequestHelper
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
    },
});

// export const {}
export default userSlice.reducer;
