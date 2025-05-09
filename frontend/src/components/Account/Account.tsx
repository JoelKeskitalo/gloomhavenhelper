import { useAuthSelector, useAuthDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import './Account.scss';

const Account = () => {
    const user = useAuthSelector((state) => state.auth.user);
    const dispatch = useAuthDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const character = user?.character;
    const heroClass = character?.heroId?.class ?? 'Unknown';
    const characterName = character?.name ?? 'Unnamed';

    return (
        <div className="account-container">
            <div className="account-box">
                <h1 className="account-title">Account Settings</h1>
                <p className="account-text">Manage your profile and preferences.</p>

                <div className="account-details">
                    <p>
                        <strong>Email:</strong> {user?.email || 'Unknown'}
                    </p>
                    <p>
                        <strong>Hero Class:</strong> {heroClass}
                    </p>
                    <p>
                        <strong>Character Name:</strong> {characterName}
                    </p>
                    <p>
                        <strong>Scenarios Played:</strong> {user?.playedScenarios?.length ?? 0}
                    </p>
                </div>

                <div className="account-settings">
                    <h2 className="account-title">Settings</h2>
                    <p>
                        <strong>Dark Mode:</strong> {user?.settings?.enableDarkMode ? 'On' : 'Off'}
                    </p>
                    <p>
                        <strong>Language:</strong> {user?.settings?.preferredLanguage ?? 'Unknown'}
                    </p>
                </div>

                <div className="account-actions">
                    <button className="account-button">Change Password</button>
                    <button className="account-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Account;
