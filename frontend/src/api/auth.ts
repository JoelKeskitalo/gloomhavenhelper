import axios from 'axios';
import { User } from '../types/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface LoginPayload {
    email: string;
    password: string;
}

interface LoginResponse {
    user: User;
    token: string;
}

export const loginUser = async (credentials: LoginPayload): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>('/api/users/login', credentials);
        return response.data;
    } catch (error: unknown) {
        const err = error as Error & { response?: { data?: { message?: string } } };
        throw new Error(err.response?.data?.message || 'Login failed');
    }
};

export const getUserById = async (userId: string): Promise<User> => {
    try {
        const response = await axios.get<User>(`/api/users/${userId}`);
        return response.data;
    } catch (error: unknown) {
        const err = error as Error & { response?: { data?: { message?: string } } };
        throw new Error(err.response?.data?.message || 'Failed to fetch user');
    }
};
