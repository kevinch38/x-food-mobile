import { configureStore } from '@reduxjs/toolkit';
import userSlice from './src/slices/userSlice';
import uiSlice from './src/slices/uiSlice';
import pinReducer from './src/slices/pinSlice';
import asyncMiddlewareAction from './src/middlewares/asyncMiddlewareAction';
import merchantSlice from './src/slices/merchantSlice';
import citySlice from './src/slices/citySlice';
import merchantBranchSlice from './src/slices/merchantBranch';
import loyaltyPointSlice from './src/slices/loyaltyPointSlice';
import authSlice from './src/slices/authSlice';
import { cartSlice } from './src/slices/cartSlice';
import orderSlice from './src/slices/orderSlice';
import balanceSlice from './src/slices/balanceSlice';
import friendSlice from './src/slices/friendSlice';

const setupStore = () =>
    configureStore({
        reducer: {
            user: userSlice.reducer,
            merchant: merchantSlice.reducer,
            merchantBranch: merchantBranchSlice.reducer,
            city: citySlice.reducer,
            ui: uiSlice.reducer,
            pin: pinReducer.reducer,
            auth: authSlice.reducer,
            loyaltyPoint: loyaltyPointSlice.reducer,
            cart: cartSlice.reducer,
            order: orderSlice.reducer,
            balance: balanceSlice.reducer,
            friend: friendSlice.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(asyncMiddlewareAction),
    });

export default setupStore;
