import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER } from "../../config";

export const getAttribute = createAsyncThunk('auth/getAttribute', async () => {
    const response = await axios.get(`${SERVER}/attribute`);
    return response.data;
})
const attributeSlice = createSlice({
    initialState: {
        current: [],
    },
    name: 'attribute',
    reducers: {
        addAttribute(state,action) {
            
        }
    },
    extraReducers: {
        [getAttribute.fulfilled]: (state,action) => {
            state.current = action.payload;
        }
    }
})
export const { addAttribute } = attributeSlice.actions;
export default attributeSlice.reducer;
