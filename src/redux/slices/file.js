import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER } from "../../config";

export const getFile = createAsyncThunk('auth/getFile', async ({limit, page}) => {
    if(page > 0) {
        const response = await axios.get(`${SERVER}/library`,{params: {limit: limit, page: page}});
        return response.data;
    }
    return [];
})
const fileSlice = createSlice({
    initialState: {
        current: [],
        selectRadio: null
    },
    name: 'file',
    reducers: {
        addFile(state,action) {
            state.current = [action.payload,...state.current]
            return state;
        },
        removeFile(state,action) {
            state.current  = state.current.filter((item) => item.id !== action.payload);
            return state;
        },
        setSelectRadio(state,action) {
            state.selectRadio = action.payload;
        },
        removeSelectRadio(state) {
            state.selectRadio = null;
        }
    },
    extraReducers: {
        [getFile.fulfilled]: (state,action) => {
            state.current = [...state.current,...action.payload]
            state.isLoading = false;
            return state;
        }
    }
})
export const { addFile,removeFile,setSelectRadio,removeSelectRadio} = fileSlice.actions;
export default fileSlice.reducer;
