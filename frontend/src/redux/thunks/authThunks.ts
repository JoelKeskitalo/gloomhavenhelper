import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, RegisterPayload, LoginPayload } from '../../types/auth';
import { registerUser, loginUser, getUserById } from '../../api/auth';

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
            const response = await getUserById(userId);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
