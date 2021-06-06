import { createSlice } from "@reduxjs/toolkit";

const selectSlice = createSlice({
    initialState: [],
    name: 'select',
    reducers: {
        addSelect(state,action) {
            state = [...state,...action.payload]
            return state;
        },
        removeSelect(state,action) {
            state = state.filter((id) => !action.payload.includes(id));
            return state;
        }
    }
})
export const { addSelect,removeSelect } = selectSlice.actions;
export default selectSlice.reducer;
