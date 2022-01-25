import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    scanStatus: false,
    qrValues: null
}

export const scanSlice = createSlice({
    name: 'scan',
    initialState,
    reducers: {
        setScanStatus: (state, action) => {
            state.scanStatus = action.payload
        },
        setQrValues: (state, action) => {
            state.qrValues = action.payload
        }
    }
})

export const { setScanStatus, setQrValues } = scanSlice.actions;

// Selectors
export const selectScanStatus = (state) => state.scan.scanStatus;
export const selectQrValues = (state) => state.scan.qrValues;

export default scanSlice.reducer;