import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RequestHelper from "../services/RequestHelper";

export const selectedUserPhoneNumberAction = createAsyncThunk(
  "user/selectedUserPhoneNumberAction",
  RequestHelper
);

const authSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    selectedUserPhoneNumberAction: null,
  },
  extraReducers: (builder) => {
    builder.addCase(selectedUserPhoneNumberAction.fulfilled, (state, { payload }) => {
      if (payload) {
        state.selectedUserPhoneNumberAction = payload;
      }
    });
  },
});

export default authSlice;
