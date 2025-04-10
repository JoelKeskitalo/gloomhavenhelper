import axios from 'axios';
import { User } from '../types/auth';

type MinimalUser = Pick<User, 'id' | 'email'>;

export const fetchUsers = async (): Promise<MinimalUser[]> => {
    const token = localStorage.getItem('token');
    const response = await axios.get<{ users: MinimalUser[] }>('/api/users', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.users;
};

export const removeUser = async (userId: string): Promise<void> => {
    const token = localStorage.getItem('token');
    await axios.delete(`/api/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
