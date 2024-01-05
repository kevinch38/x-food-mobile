import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, { payload }) => {
            console.log('==> ', payload);
            state.items = [...state.items, payload];
        },
        removeFromCart: (state, { payload }) => {
            const newCart = [...state.items];
            const itemIndex = state.items.findIndex(
                (item) => item.itemID === payload.id,
            );
            if (itemIndex >= 0) {
                newCart.splice(itemIndex, 1);
            } else {
                console.log("can't remove the item that is not added to cart!");
            }
            state.items = newCart;
        },
        emptyCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export const selectCartItemsById = (state, id) =>
    state.cart.items.filter((item) => item.itemID === id);
export const selectCartTotal = (state) =>
    state.cart.items.reduce((total, item) => (total += item.price), 0);
