import { configureStore } from "@reduxjs/toolkit";
import allBusReducer from "../features/allBus/allBusSlice";

export const store = configureStore({
    reducer: {
        allBus: allBusReducer,
    }
})