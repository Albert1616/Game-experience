import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface stateTypes {
    isDarkMode: boolean,
    loginModalIsOpen: boolean,
    searchModalIsOpen:boolean
}

const initialState: stateTypes = {
    isDarkMode: false,
    loginModalIsOpen: false,
    searchModalIsOpen: false
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
        },
        setSearchModalIsOpen: (state, action: PayloadAction<boolean>) => {
            state.searchModalIsOpen = action.payload
        } 
    }
})

export const { setIsDarkMode, setLoginModalIsOpen, setSearchModalIsOpen } = globalSlicer.actions;
export default globalSlicer.reducer;