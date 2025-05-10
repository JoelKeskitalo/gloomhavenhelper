import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthDispatch } from '../../redux/store';
import { loginUserThunk } from '../../redux/thunks/authThunks';
import './Login.scss';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const dispatch = useAuthDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const result = await dispatch(loginUserThunk({ email, password })).unwrap();

            // Direktkontroll på character efter inloggning
            if (result.character) {
                navigate('/hero');
            } else {
                navigate('/choose-hero');
            }
        } catch (error: unknown) {
            const err = error as Error;
            setError(err.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">Welcome Back</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    {error && <p className="error-message">{error}</p>}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="login-input"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="password-input"
                        required
                    />
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>
                <div className="login-links">
                    <Link to="/forgot-password" className="forgot-password">
                        Forgot password?
                    </Link>
                    <Link to="/register" className="register-link">
                        No account? Register here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
