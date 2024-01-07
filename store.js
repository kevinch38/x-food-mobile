import { configureStore } from '@reduxjs/toolkit';
import userSlice from './src/slices/userSlice';
import uiSlice from './src/slices/uiSlice';
import pinReducer from './src/slices/pinSlice';
import asyncMiddlewareAction from './src/middlewares/asyncMiddlewareAction';
import merchantSlice from './src/slices/merchantSlice';
import citySlice from './src/slices/citySlice';
import merchantBranchSlice from './src/slices/merchantBranch';
import authSlice from './src/slices/authSlice';
import { cartSlice } from './src/slices/cartSlice';
import orderSlice from './src/slices/orderSlice';

const setupStore = () =>
    configureStore({
        reducer: {
            user: userSlice,
            merchant: merchantSlice.reducer,
            merchantBranch: merchantBranchSlice.reducer,
            city: citySlice.reducer,
            ui: uiSlice.reducer,
            pin: pinReducer,
            auth: authSlice.reducer,
            cart: cartSlice.reducer,
            order: orderSlice.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(asyncMiddlewareAction),
    });

export default setupStore;
