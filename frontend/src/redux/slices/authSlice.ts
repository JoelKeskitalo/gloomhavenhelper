import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../../types/auth';
import { registerUserThunk, loginUserThunk, fetchUser } from '../thunks/authThunks';

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUserThunk.fulfilled, (state, action) => {
            console.log('loginUserThunk fulfilled payload:', action.payload);
            state.user = action.payload;
            state.isAuthenticated = true;
        });
        builder.addCase(loginUserThunk.fulfilled, (state, action) => {
            console.log('Payload after login:', action.payload);
            state.user = action.payload;
            state.isAuthenticated = true;
            console.log('Updated state in authSlice:', state);
        });

        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
