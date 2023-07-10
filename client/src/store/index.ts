import { combineReducers, configureStore } from "@reduxjs/toolkit";
import changeSlice from "./rerenderSlice";
import changeBlockSlice from "./blockSliceRerender";


const rootReducer = combineReducers({
    help: changeSlice,
    block: changeBlockSlice,
});

export const store = configureStore({
    reducer: rootReducer,
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;