import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    error: null,
    errorKey: 0,
    isLoading: false,
  },
  reducers: {
    loading: (state) => {
      state.isLoading = true;
    },
    success: (state) => {
      state.isLoading = false;
    },
    finish: (state) => {
      (state.isLoading = false), (state.error = null);
    },
    error: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      state.error += 1;
    },
  },
});

export const { loading, success, finish, error } = uiSlice.actions;
export default uiSlice;
