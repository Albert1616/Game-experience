import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface stateTypes {
    isAuth: boolean,
    isDarkMode: boolean,
    loginModalIsOpen: boolean,
    searchModalIsOpen: boolean
}

const initialState: stateTypes = {
    isAuth: false,
    isDarkMode: false,
    loginModalIsOpen: false,
    searchModalIsOpen: false
}

const globalSlicer = createSlice({
    name: "global",
    initialState,
    reducers: {
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
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

export const {
    setIsDarkMode,
    setLoginModalIsOpen,
    setSearchModalIsOpen,
    setIsAuth } = globalSlicer.actions;
export default globalSlicer.reducer;