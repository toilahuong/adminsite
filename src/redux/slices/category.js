import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER } from "../../config";

export const getCategory = createAsyncThunk('auth/getCategory', async () => {
    const response = await axios.get(`${SERVER}/category/tree`);
    return response.data;
})
const categorySlice = createSlice({
    initialState: {
        current: [],
    },
    name: 'category',
    reducers: {
        addCategory(state,action) {
            
        }
    },
    extraReducers: {
        [getCategory.fulfilled]: (state,action) => {
            state.current = action.payload;
        }
    }
})
export const { addCategory } = categorySlice.actions;
export default categorySlice.reducer;
