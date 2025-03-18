import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, User, RegisterPayload, LoginPayload } from '../../types/auth';
import { registerUser, loginUser, getUserById } from '../../api/auth';

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
};

export const registerUserThunk = createAsyncThunk<User, RegisterPayload>(
    'auth/registerUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await registerUser(credentials);
            return response.user;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const loginUserThunk = createAsyncThunk<User, LoginPayload>(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await loginUser(credentials);
            return response.user;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

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
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUserThunk.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        });
        builder.addCase(loginUserThunk.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
