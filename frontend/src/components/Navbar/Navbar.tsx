import { NavLink } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
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
                    <NavLink to="/account" className="navbar-link">
                        Account
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
