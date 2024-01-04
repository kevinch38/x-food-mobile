import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, { payload }) => {
            state.items = [...state.items, payload];
        },
        removeFromCart: (state, action) => {
            const { index, item } = action.payload;

            const updatedCart = [...state.items];
            const targetItem = updatedCart[index];

            if (targetItem) {
                const itemIndexToDelete = updatedCart.findIndex(
                    (cartItem) =>
                        cartItem.itemID === targetItem.itemID &&
                        cartItem.itemVarieties.every((variety) =>
                            targetItem.itemVarieties.some(
                                (targetVariety) =>
                                    targetVariety.subVarietyID ===
                                    variety.subVarietyID,
                            ),
                        ),
                );

                if (itemIndexToDelete !== -1) {
                    if (
                        updatedCart[itemIndexToDelete].itemVarieties.length > 1
                    ) {
                        const varietyIndexToDelete = updatedCart[
                            itemIndexToDelete
                        ].itemVarieties.findIndex((variety) =>
                            item.itemVarieties.some(
                                (itemVariety) =>
                                    itemVariety.subVarietyID ===
                                    variety.subVarietyID,
                            ),
                        );

                        updatedCart[itemIndexToDelete].itemVarieties.splice(
                            varietyIndexToDelete,
                            1,
                        );
                    } else {
                        updatedCart.splice(itemIndexToDelete, 1);
                    }
                }
            }

            state.items = updatedCart;
        },
        emptyCart: (state) => {
            state.items = [];
        },
        removeAll(state, { payload }) {
            const { id, subVarietyID } = payload;

            state.items = state.items
                .map((item) => {
                    if (item.itemID === id) {
                        if (subVarietyID) {
                            const updatedVarieties = item.itemVarieties.filter(
                                (variety) => variety.varietyID !== subVarietyID,
                            );

                            if (updatedVarieties.length > 0) {
                                item.itemVarieties = updatedVarieties;
                            } else {
                                return null;
                            }
                        } else {
                            return null;
                        }
                    }
                    return item;
                })
                .filter(Boolean);
        },
    },
});

export const { addToCart, removeFromCart, emptyCart, removeAll } =
    cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export const selectCartItemsById = (state, id) =>
    state.cart.items.filter((item) => item.itemID === id);
export const selectCartTotal = (state) =>
    state.cart.items.reduce((total, item) => (total += item.itemPrice), 0);
