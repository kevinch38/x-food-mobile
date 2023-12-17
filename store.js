import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./src/slices/userSlice";
import uiSlice from "./src/slices/uiSlice";
import asyncMiddlewareAction from './src/middlewares/asyncMiddlewareAction';
import merchantSlice from './src/slices/merchantSlice';
import authSlice from "./src/slices/authSlice";

const setupStore = () =>
    configureStore({
        reducer: {
            user: userSlice.reducer,
            merchant: merchantSlice.reducer,
            ui: uiSlice.reducer,
            auth: authSlice.reducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(asyncMiddlewareAction),
    });

export default setupStore;
