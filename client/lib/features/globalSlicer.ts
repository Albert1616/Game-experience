import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface stateTypes {
    isDarkMode: boolean
}

const initialState: stateTypes = {
    isDarkMode: false
}

const globalSlicer = createSlice({
    name: "global",
    initialState,
    reducers: {
        setIsDarkMode: (state, action: PayloadAction<boolean>) => {
            state.isDarkMode = action.payload;
        }
    }
})

export const { setIsDarkMode } = globalSlicer.actions;
export default globalSlicer.reducer;