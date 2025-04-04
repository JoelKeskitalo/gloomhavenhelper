import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'; // note: importing specific types for redux hooks
import authReducer from './slices/authSlice'; // reducer from authSlice

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks for Redux
export const useAuthDispatch = () => useDispatch<AppDispatch>();
export const useAuthSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
