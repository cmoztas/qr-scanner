import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    camera: null
}

export const permissionSlice = createSlice({
    name: 'permissions',
    initialState,
    reducers: {
        setCameraPermission: (state, action) => {
            state.camera = action.payload
        }
    }
});

export const {setCameraPermission} = permissionSlice.actions;

// Selectors
export const selectCameraPermission = (state) => state.permissions.camera;

export default permissionSlice.reducer;