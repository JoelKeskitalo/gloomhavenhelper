import axios from 'axios';
import {
    User,
    RegisterPayload,
    RegisterResponse,
    LoginPayload,
    LoginResponse,
} from '../types/auth';

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
