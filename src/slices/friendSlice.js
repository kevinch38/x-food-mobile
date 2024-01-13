import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import RequestHelper from '../services/RequestHelper';

export const friendAction = createAsyncThunk('friend/addFriend', RequestHelper);

const friendSlice = createSlice({
    name: 'friend',
    initialState: {
        friends: [],
    },
    extraReducers: (builder) => {
        builder.addCase(friendAction.fulfilled, (state, { payload }) => {
            if (payload) {
                state.friends = payload.data;
            }
        });
    },
});

export default friendSlice;
