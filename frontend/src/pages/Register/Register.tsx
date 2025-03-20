import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { registerUserThunk } from '../../redux/thunks/authThunks';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Register.scss';

const Register = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            await dispatch(
                registerUserThunk({
                    email: form.email,
                    password: form.password,
                })
            ).unwrap();
            navigate('/choose-hero'); // Redirect to hero selection after registration
        } catch (err) {
            setError('Registration failed');
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h1 className="register-title">Create an Account</h1>
                {error && <p className="register-error">{error}</p>}
                <form className="register-form" onSubmit={handleSubmit}>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="register-input"
                        value={form.email}
                        onChange={handleChange}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="register-input"
                        value={form.password}
                        onChange={handleChange}
                    />
                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        className="register-input"
                        value={form.confirmPassword}
                        onChange={handleChange}
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
