import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface rerenderState {
    helpRerender: boolean;
}
const initialState: rerenderState = {
    helpRerender: true
}

const changeSlice = createSlice({
    name: 'change',
    initialState,
    reducers: {
        changeValue(state,) {
            state.helpRerender = !state.helpRerender;
        },
    }
});

export default changeSlice.reducer;
export const { changeValue } = changeSlice.actions;