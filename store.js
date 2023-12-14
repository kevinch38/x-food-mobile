import { configureStore } from '@reduxjs/toolkit';
import userSlice from './src/slices/userSlice';
import uiSlice from './src/slices/uiSlice';
import asyncActionMiddleware from './src/middlewares/asyncActionMiddleware';

const setupStore = () =>
    configureStore({
        reducer: {
            user: userSlice.reducer,
            ui: uiSlice.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(asyncActionMiddleware),
    });

export default setupStore;
