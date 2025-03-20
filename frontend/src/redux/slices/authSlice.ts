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
            const user = response.user;

            if (user.token) {
                localStorage.setItem('token', user.token);
            }

            return user;
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
            const user = response.user;

            if (user.token) {
                localStorage.setItem('token', user.token);
            }

            return user;
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
