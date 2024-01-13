import {createSlice} from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        tempItems: [],
    },
    reducers: {
        addToCart: (state, {payload}) => {
            state.items = [...state.items, payload];
        },
        addTempCartToCart: (state, {payload}) => {
            state.items.push(...payload.map((itm) => ({...itm})));
        },
        addToTempCart: (state, {payload}) => {
            state.tempItems = [...state.tempItems, payload];
        },

        removeFromTempCart: (state, {payload}) => {
            const {itemID, itemVarieties} = payload;

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

                    // Hapus item jika memiliki subVarietyID yang sama
                    if (hasDuplicateSubVarietyID) {
                        found = true; // Set found ke true untuk menghapus satu item saja
                        return false; // Hapus item saat iterasi ini
                    }
                }
                return true;
            });

            state.tempItems = updatedTempItems;
        },
        removeFromCart: (state, {payload}) => {
            const {itemID, itemVarieties} = payload;

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

                    // Hapus item jika memiliki subVarietyID yang sama
                    if (hasDuplicateSubVarietyID) {
                        found = true; // Set found ke true untuk menghapus satu item saja
                        return false; // Hapus item saat iterasi ini
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
        removeAll(state, {payload}) {
            const {itemID, itemVarieties} = payload;

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
} = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export const selectCartItemsById = (state, id) =>
    state.cart.items.filter((item) => item.itemID === id);
export const selectCartTotal = (state) =>
    state.cart.items.reduce((total, item) => (total += item.itemPrice), 0);
