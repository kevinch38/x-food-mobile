import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./src/slices/userSlice";
import uiSlice from "./src/slices/uiSlice";
import asyncMiddlewareAction from './src/middlewares/asyncMiddlewareAction';
import merchantSlice from './src/slices/merchantSlice';
import citySlice from './src/slices/citySlice';
import merchantBranchSlice from './src/slices/merchantBranch';

const setupStore = () =>
    configureStore({
        reducer: {
            user: userSlice.reducer,
            merchant: merchantSlice.reducer,
            merchantBranch: merchantBranchSlice.reducer,
            city: citySlice.reducer,
            ui: uiSlice.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(asyncMiddlewareAction),
    });

export default setupStore;
