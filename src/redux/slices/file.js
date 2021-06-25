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
        selectRadio: null,
        selectCheckbox: [],
        page: 0,
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
        removeAllFile(state) {
            state.current = [];
        },
        setSelectRadio(state,action) {
            state.selectRadio = action.payload;
        },
        removeSelectRadio(state) {
            state.selectRadio = null;
        },
        setSelectCheckbox(state,action) {
            state.selectCheckbox = [...state.selectCheckbox,...action.payload];
        },
        removeSelectCheckbox(state,action) {
            state.selectCheckbox = state.selectCheckbox.filter(id => id !== action.payload);
            return state;
        },
        incrementPage(state) {
            state.page += 1;
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
export const { 
    addFile,
    removeFile,
    removeAllFile,
    setSelectRadio,
    removeSelectRadio,
    setSelectCheckbox,
    removeSelectCheckbox,
    incrementPage
} = fileSlice.actions;
export default fileSlice.reducer;
