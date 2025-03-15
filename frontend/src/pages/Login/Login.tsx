import { Link } from 'react-router-dom';
import './Login.scss';

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">Welcome Back</h1>
                <form className="login-form">
                    <input type="text" placeholder="Username" className="login-input" />
                    <input type="password" placeholder="Password" className="password-input" />
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
