import globalSlicer from "@/lib/features/globalSlicer";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { userApi } from "@/services/api";

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