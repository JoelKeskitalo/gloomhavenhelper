import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthDispatch, useAuthSelector } from '../../redux/store'; // Redux hooks to send and recieve state from redux store
import { fetchUser } from '../../redux/slices/authSlice'; // redux action, updates state with successful login
import { loginUser } from '../../api/auth'; // api function, post call to backend for authentication
import './Login.scss';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const dispatch = useAuthDispatch();
    const navigate = useNavigate();

    const isAuthenticated = useAuthSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/hero');
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const userData = await loginUser({ email, password });
            dispatch(login(userData.user)); // Saves the user in redux
            dispatch(fetchUser(userData.user.id));
            console.log(`Welcome ${userData.user.id}`);
            navigate('/hero');
        } catch (error: unknown) {
            const err = error as Error;
            setError(err.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">Welcome Back</h1>
                <form className="login-form" onSubmit={handleLogin}>
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
