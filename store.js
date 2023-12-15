import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./src/slices/userSlice";
import uiSlice from "./src/slices/uiSlice";
import pinReducer from "./src/slices/pinSlice";

const setupStore = () =>
  configureStore({
    reducer: { user: userSlice, ui: uiSlice.reducer, pin:pinReducer},
  });

export default setupStore;
