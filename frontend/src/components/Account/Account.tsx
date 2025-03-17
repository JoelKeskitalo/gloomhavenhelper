import './Account.scss';

const Account = () => {
    return (
        <div className="account-container">
            <div className="account-box">
                <h1 className="account-title">Account Settings</h1>
                <p className="account-text">Manage your profile and preferences.</p>
                <div className="account-details">
                    <p>
                        <strong>Username:</strong> Player123
                    </p>
                    <p>
                        <strong>Email:</strong> player@example.com
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
