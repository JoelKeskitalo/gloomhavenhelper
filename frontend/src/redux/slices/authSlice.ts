import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, User } from '../../types/auth';
import { getUserById } from '../../api/auth';

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
};

export const fetchUser = createAsyncThunk<User, string>(
    'auth/fetchUser',
    async (userId, { rejectWithValue }) => {
        try {
            return await getUserById(userId);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        });
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
