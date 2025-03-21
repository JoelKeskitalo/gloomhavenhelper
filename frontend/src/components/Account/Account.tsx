import { useAuthSelector } from '../../redux/store';
import './Account.scss';

const Account = () => {
    const user = useAuthSelector((state) => state.auth.user);

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
                        <strong>Hero Selected:</strong>{' '}
                        {user?.character?.heroId?.name ? user.character.heroId.name : 'No'}
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
                    <button className="account-button">Logout</button>
                </div>
            </div>
        </div>
    );
};

export default Account;
