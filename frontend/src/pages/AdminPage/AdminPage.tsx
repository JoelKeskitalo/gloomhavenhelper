import { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPage.scss';
import { User } from '../../types/auth';

type MinimalUser = Pick<User, 'id' | 'email'>;

const AdminPage = () => {
    const [users, setUsers] = useState<MinimalUser[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get<{ users: MinimalUser[] }>('/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(response.data.users);
        } catch (err) {
            setError('Failed to fetch users');
        }
    };

    const removeUser = async (userId: string) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        } catch (err) {
            setError('Failed to remove user');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="admin-page">
            <h1 className="admin-title">Admin Panel</h1>
            {error && <p className="admin-error">{error}</p>}
            <div className="user-list">
                {users.map((user) => (
                    <div className="user-card" key={user.id}>
                        <span>{user.email}</span>
                        <button className="delete-button" onClick={() => removeUser(user.id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPage;
