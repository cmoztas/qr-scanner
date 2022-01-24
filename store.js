import { configureStore } from "@reduxjs/toolkit";
import permissionReducer from './slices/permissionSlice';
import scanReducer from './slices/scanSlice';


export const store = configureStore({
    reducer: {
        permissions: permissionReducer,
        scan: scanReducer
    }
});