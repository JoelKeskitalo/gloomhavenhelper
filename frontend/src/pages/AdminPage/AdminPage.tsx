import { useEffect, useState } from 'react';
import './AdminPage.scss';
import { fetchUsers, removeUser } from '../../api/admin';
import { User } from '../../types/auth';

type MinimalUser = Pick<User, 'id' | 'email'>;

const AdminPage = () => {
    const [users, setUsers] = useState<MinimalUser[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const users = await fetchUsers();
                setUsers(users);
            } catch {
                setError('Failed to fetch users');
            }
        };
        loadUsers();
    }, []);

    const handleRemove = async (userId: string) => {
        try {
            await removeUser(userId);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        } catch {
            setError('Failed to remove user');
        }
    };

    return (
        <div className="admin-page">
            <h1 className="admin-title">Admin Panel</h1>
            {error && <p className="admin-error">{error}</p>}
            <div className="user-list">
                {users.map((user) => (
                    <div className="user-card" key={user.id}>
                        <span>{user.email}</span>
                        <button className="delete-button" onClick={() => handleRemove(user.id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPage;
