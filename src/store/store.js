import { featuresReducer } from "@/features/features";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: featuresReducer
});
