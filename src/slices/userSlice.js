import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RequestHelper from "../services/RequestHelper";
import { register } from "../services/UserService";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (payload, { rejectWithValue }) => {
    console.log("onAction", payload);
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
  }
);

export const selectedUserAction = createAsyncThunk(
  "userSelectedAction/action",
  RequestHelper
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    selectedUser: null,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        console.log("ini slice", payload);
        state.loading = false;
        state.user = payload;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        (state.loading = false), (state.error = payload);
      });
  },
});

// export const {}
export default userSlice.reducer;
