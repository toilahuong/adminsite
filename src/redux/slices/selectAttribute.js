import { createSlice, current } from "@reduxjs/toolkit";

const selectAttributeSlice = createSlice({
    initialState: [],
    name: 'selectAttribute',
    reducers: {
        addSelectAttribute(state,action) {
            const data = [...current(state)];
            let check = false;
            const find = data.map((attr) => {
                if(attr.id === action.payload[0].id) {
                    check = true;
                    return action.payload[0];
                }
                else return attr;
            });
            if(check === false) state = [...find,...action.payload];
            else state = [...find];
            return state;
        }
    }
})
export const { addSelectAttribute } = selectAttributeSlice.actions;
export default selectAttributeSlice.reducer;
