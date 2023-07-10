import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface rerenderState {
    blockRerender: boolean;
}
const initialState: rerenderState = {
    blockRerender: true
}

const changeBlockSlice = createSlice({
    name: 'change',
    initialState,
    reducers: {
        changeBlockValue(state,) {
            state.blockRerender = !state.blockRerender;
        },
    }
});

export default changeBlockSlice.reducer;
export const { changeBlockValue } = changeBlockSlice.actions;