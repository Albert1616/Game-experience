import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { userApi } from "@/src/services/api";
import globalSlicer from "./features/globalSlicer";

export const makeStore = () => {
    return configureStore({
        reducer: {
            global: globalSlicer,
            [userApi.reducerPath]: userApi.reducer
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware)
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;