import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./src/slices/userSlice";
import uiSlice from "./src/slices/uiSlice";
import pinReducer from "./src/slices/pinSlice";
import asyncMiddlewareAction from './src/middlewares/asyncMiddlewareAction';
import merchantSlice from './src/slices/merchantSlice';

const setupStore = () =>
    configureStore({
        reducer: {
            user: userSlice,
            merchant: merchantSlice.reducer,
            ui: uiSlice.reducer,
            pin:pinReducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(asyncMiddlewareAction),
    });

export default setupStore;
