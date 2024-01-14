import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        tempItems: [],
    },
    reducers: {
        addToCart: (state, { payload }) => {
            state.items = [...state.items, payload];
        },
        addTempCartToCart: (state, { payload }) => {
            state.items.push(...payload.map((itm) => ({ ...itm })));
        },

        updateItem: (state, { payload }) => {
            state.tempItems.map(
                (item) => (
                    (item.itemVarieties = payload.itemVarieties),
                    (item.itemPrice = payload.itemPrice)
                ),
            );
        },
        addToTempCart: (state, { payload }) => {
            state.tempItems = [...state.tempItems, payload];
        },

        removeFromTempCart: (state, { payload }) => {
            const { itemID, itemVarieties } = payload;

            const foundIndex = state.tempItems.findIndex(
                (item) => item.itemID === itemID,
            );

            if (foundIndex !== -1) {
                const updatedItem = state.tempItems[foundIndex];

                if (!itemVarieties || itemVarieties.length === 0) {
                    state.tempItems.splice(foundIndex, 1);
                } else {
                    updatedItem.itemVarieties =
                        updatedItem.itemVarieties.filter(
                            (variety) =>
                                !itemVarieties.some(
                                    (v) =>
                                        v.subVarietyID === variety.subVarietyID,
                                ),
                        );

                    if (updatedItem.itemVarieties.length === 0) {
                        state.tempItems.splice(foundIndex, 1);
                    }
                }
            }
        },

        removeFromCart: (state, { payload }) => {
            const { itemID, itemVarieties } = payload;

            let found = false;
            const updatedItems = state.items.filter((item) => {
                if (!found && item.itemID === itemID && item.itemVarieties) {
                    const subVarietyIDs = item.itemVarieties.map(
                        (variety) => variety.subVarietyID,
                    );
                    const payloadSubVarietyIDs = itemVarieties.map(
                        (variety) => variety.subVarietyID,
                    );
                    const hasDuplicateSubVarietyID = subVarietyIDs.some(
                        (subVarietyID) =>
                            payloadSubVarietyIDs.includes(subVarietyID),
                    );

                    if (hasDuplicateSubVarietyID) {
                        found = true;
                        return false;
                    }
                }
                return true;
            });

            state.items = updatedItems;
        },

        emptyCart: (state) => {
            state.items = [];
        },
        emptyTempCart: (state) => {
            state.tempItems = [];
        },
        removeAll(state, { payload }) {
            const { itemID, itemVarieties } = payload;

            const updatedItems = state.items.filter((item) => {
                const isSameItemID = item.itemID === itemID;

                if (isSameItemID) {
                    const payloadSubVarietyIDs = itemVarieties.map(
                        (variety) => variety.subVarietyID,
                    );

                    const subVarietyIDs = item.itemVarieties.map(
                        (variety) => variety.subVarietyID,
                    );

                    const allPayloadIDsExist = payloadSubVarietyIDs.every(
                        (payloadID) => subVarietyIDs.includes(payloadID),
                    );

                    if (
                        allPayloadIDsExist &&
                        payloadSubVarietyIDs.length === subVarietyIDs.length
                    ) {
                        return false;
                    }
                }

                return true;
            });

            state.items = updatedItems;
        },
    },
});

export const {
    addToTempCart,
    addToCart,
    removeFromCart,
    emptyCart,
    removeAll,
    emptyTempCart,
    removeFromTempCart,
    addTempCartToCart,
    updateItem,
} = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) =>
    state.cart.items.reduce((total, item) => (total += item.itemPrice), 0);
