import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    scanStatus: false
}

export const scanSlice = createSlice({
    name: 'scan',
    initialState,
    reducers: {
        setScanStatus: (state, action) => {
            state.scanStatus = action.payload
        }
    }
})

export const { setScanStatus } = scanSlice.actions;

// Selectors
export const selectScanStatus = (state) => state.scan.scanStatus;

export default scanSlice.reducer;