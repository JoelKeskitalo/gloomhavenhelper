import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthSelector, useAuthDispatch } from '../../redux/store';
import { logout } from '../../redux/slices/authSlice';
import './Navbar.scss';

const Navbar = () => {
    const user = useAuthSelector((state) => state.auth.user);
    const isAuthenticated = useAuthSelector((state) => state.auth.isAuthenticated);
    const dispatch = useAuthDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <NavLink to="/" className="navbar-logo">
                    Gloomhaven Helper
                </NavLink>
                <div className="navbar-links">
                    <NavLink to="/hero" className="navbar-link">
                        Hero
                    </NavLink>
                    <NavLink to="/decks" className="navbar-link">
                        Decks
                    </NavLink>
                    <NavLink to="/rules" className="navbar-link">
                        Rules
                    </NavLink>

                    {isAuthenticated ? (
                        <>
                            {user?.isAdmin && (
                                <NavLink to="/admin" className="navbar-link">
                                    Admin
                                </NavLink>
                            )}
                            <NavLink to="/account" className="navbar-link">
                                Account
                            </NavLink>
                            <button className="navbar-link logout-button" onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <NavLink to="/login" className="navbar-link">
                            Login
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
