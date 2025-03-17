import { Link } from 'react-router-dom';
import './Home.scss';

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-box">
                <h1 className="home-title">Welcome to Gloomhaven Helper</h1>
                <p className="home-text">Choose a section to begin:</p>
                <div className="home-links">
                    <Link to="/hero" className="home-link">
                        Hero
                    </Link>
                    <Link to="/decks" className="home-link">
                        Decks
                    </Link>
                    <Link to="/rules" className="home-link">
                        Rules
                    </Link>
                    <Link to="/account" className="home-link">
                        Account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
