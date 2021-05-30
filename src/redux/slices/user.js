import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER } from "../../config";

export const getUser = createAsyncThunk('auth/getUser', async () => {
    const response = await axios.get(`${SERVER}/user/get-admin`,{withCredentials: true});
    return response.data;
})
const userSlice = createSlice({
    initialState: {
        current: {},
        isLoading: true,
        isAdmin: false
    },
    name: 'user',
    reducers: {
        setUser(state,action) {

        }
    },
    extraReducers: {
        [getUser.pending]: (state,action) => {
            state.isLoading = true;
        },
        [getUser.rejected]: (state,action) => {
            state.isLoading = false;
        },
        [getUser.fulfilled]: (state,action) => {
            state.current = action.payload;
            state.isLoading = false;
            state.isAdmin = true;
        }
    }
})
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
