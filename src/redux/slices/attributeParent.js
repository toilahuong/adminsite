import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER } from "../../config";

export const getAttributeParent = createAsyncThunk('auth/getAttributeParent', async () => {
    const response = await axios.get(`${SERVER}/attribute-parent`);
    return response.data;
})
const attributeParentSlice = createSlice({
    initialState: {
        current: [],
    },
    name: 'attributeParent',
    reducers: {
        addAttributeParent(state,action) {
            
        }
    },
    extraReducers: {
        [getAttributeParent.fulfilled]: (state,action) => {
            state.current = action.payload;
        }
    }
})
export const { addAttributeParent } = attributeParentSlice.actions;
export default attributeParentSlice.reducer;
