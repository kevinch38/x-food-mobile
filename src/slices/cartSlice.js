import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        tempItems: [],
        sale : 0
    },
    reducers: {
        addToCart: (state, { payload }) => {
            state.items = [...state.items, payload];
        },

        setPiece: (state, { payload }) => {
            state.sale = payload;
        },
        addTempCartToCart: (state, { payload }) => {
            state.items.push(...payload.map((itm) => ({ ...itm })));
        },

        updateItem: (state, { payload }) => {
            console.log(payload, '==== payload cart');
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

            let found = false;
            const updatedTempItems = state.tempItems.filter((item) => {
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

            state.tempItems = updatedTempItems;
        },

        // removeFromTempCart: (state, { payload }) => {
        //     const { itemID, itemVarieties } = payload;
        //
        //     const updatedTempItems = state.tempItems.filter((item) => {
        //         if (item.itemID === itemID && item.itemVarieties) {
        //             const subVarietyIDs = item.itemVarieties.map(
        //                 (variety) => variety.subVarietyID,
        //             );
        //             const payloadSubVarietyIDs = itemVarieties.map(
        //                 (variety) => variety.subVarietyID,
        //             );
        //
        //             // Check if all subVarietyIDs match
        //             const hasAllSubVarietyID = payloadSubVarietyIDs.every(
        //                 (subVarietyID) => subVarietyIDs.includes(subVarietyID),
        //             );
        //
        //             if (hasAllSubVarietyID) {
        //                 return false; // Remove if all subVarietyIDs match
        //             } else {
        //                 // Remove one subVarietyID at a time if not all subVarietyIDs match
        //                 const remainingSubVarietyIDs = subVarietyIDs.filter(
        //                     (subVarietyID) =>
        //                         !payloadSubVarietyIDs.includes(subVarietyID),
        //                 );
        //
        //                 if (
        //                     remainingSubVarietyIDs.length < subVarietyIDs.length
        //                 ) {
        //                     // Update the itemVarieties to keep the remaining ones
        //                     item.itemVarieties = remainingSubVarietyIDs.map(
        //                         (subVarietyID) => ({
        //                             subVarietyID,
        //                         }),
        //                     );
        //                     return true;
        //                 }
        //             }
        //         }
        //         return true;
        //     });
        //
        //     state.tempItems = updatedTempItems;
        // },

        // removeFromCart: (state, { payload }) => {
        //     const { itemID, itemVarieties } = payload;
        //
        //     const updatedItems = state.items.filter((item) => {
        //         // Cek apakah itemID sama
        //         const isSameItemID = item.itemID === itemID;
        //
        //         // Jika itemID sama, lanjutkan dengan pemeriksaan subVarietyID
        //         if (isSameItemID) {
        //             // Ambil subVarietyID dari item yang ingin dihapus
        //             const payloadSubVarietyIDs = itemVarieties.map(
        //                 (variety) => variety.subVarietyID,
        //             );
        //
        //             // Ambil subVarietyID dari item dalam keranjang
        //             const subVarietyIDs = item.itemVarieties.map(
        //                 (variety) => variety.subVarietyID,
        //             );
        //
        //             // Cek apakah semua subVarietyID di item yang ingin dihapus ada di dalam item di keranjang
        //             const allPayloadIDsExist = payloadSubVarietyIDs.every(
        //                 (payloadID) => subVarietyIDs.includes(payloadID),
        //             );
        //
        //             // Jika semua subVarietyID ada di item di keranjang, hapus item ini
        //             if (
        //                 allPayloadIDsExist &&
        //                 payloadSubVarietyIDs.length === subVarietyIDs.length
        //             ) {
        //                 return false;
        //             }
        //         }
        //
        //         return true;
        //     });
        //
        //     state.items = updatedItems;
        // },

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
                // Cek apakah itemID sama
                const isSameItemID = item.itemID === itemID;

                // Jika itemID sama, lanjutkan dengan pemeriksaan subVarietyID
                if (isSameItemID) {
                    // Ambil subVarietyID dari item yang ingin dihapus
                    const payloadSubVarietyIDs = itemVarieties.map(
                        (variety) => variety.subVarietyID,
                    );

                    // Ambil subVarietyID dari item dalam keranjang
                    const subVarietyIDs = item.itemVarieties.map(
                        (variety) => variety.subVarietyID,
                    );

                    // Cek apakah semua subVarietyID di item yang ingin dihapus ada di dalam item di keranjang
                    const allPayloadIDsExist = payloadSubVarietyIDs.every(
                        (payloadID) => subVarietyIDs.includes(payloadID),
                    );

                    // Jika semua subVarietyID ada di item di keranjang, hapus item ini
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
    setPiece
} = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export const selectCartItemsById = (state, id) =>
    state.cart.items.filter((item) => item.itemID === id);
export const selectCartTotal = (state) =>
    state.cart.items.reduce((total, item) => (total += item.itemPrice), 0);
