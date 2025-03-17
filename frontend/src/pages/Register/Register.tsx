import { Link } from 'react-router-dom';
import './Register.scss';

const Register = () => {
    return (
        <div className="register-container">
            <div className="register-box">
                <h1 className="register-title">Create an Account</h1>
                <form className="register-form">
                    <input type="text" placeholder="Username" className="register-input" />
                    <input type="email" placeholder="Email" className="register-input" />
                    <input type="password" placeholder="Password" className="register-input" />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="register-input"
                    />
                    <button type="submit" className="register-button">
                        Register
                    </button>
                </form>
                <div className="register-links">
                    <Link to="/login" className="login-link">
                        Already have an account? Login here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
