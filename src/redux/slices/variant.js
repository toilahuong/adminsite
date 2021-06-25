import { createSlice } from "@reduxjs/toolkit";
const variantSlice = createSlice({
    initialState: [],
    name: 'variant',
    reducers: {
        addVariant(state,action) {
            state = [...state,...action.payload]
            return state;
        }
    }
})
export const { addVariant } = variantSlice.actions;
export default variantSlice.reducer;
