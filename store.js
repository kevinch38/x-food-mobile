import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./src/slices/userSlice";
import uiSlice from "./src/slices/uiSlice";

const setupStore = () =>
  configureStore({
    reducer: { user: userSlice.reducer, ui: uiSlice.reducer },
  });

export default setupStore;
