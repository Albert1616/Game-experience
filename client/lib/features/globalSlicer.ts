import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface stateTypes {
    isDarkMode: boolean,
    loginModalIsOpen: boolean
}

const initialState: stateTypes = {
    isDarkMode: false,
    loginModalIsOpen: false
}

const globalSlicer = createSlice({
    name: "global",
    initialState,
    reducers: {
        setIsDarkMode: (state, action: PayloadAction<boolean>) => {
            state.isDarkMode = action.payload;
        },
        setLoginModalIsOpen: (state, action: PayloadAction<boolean>) => {
            state.loginModalIsOpen = action.payload;
        }
    }
})

export const { setIsDarkMode, setLoginModalIsOpen } = globalSlicer.actions;
export default globalSlicer.reducer;