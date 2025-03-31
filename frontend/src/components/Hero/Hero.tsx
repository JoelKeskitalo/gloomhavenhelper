import './Hero.scss';
import { useAuthSelector } from '../../redux/store';

const Hero = () => {
    const user = useAuthSelector((state) => state.auth.user);
    const hero = user?.character?.heroId;

    return (
        <div className="hero-container">
            <div className="hero-box">
                <h1 className="hero-title">Your Hero</h1>
                <p className="hero-text">Manage your character stats, abilities and items.</p>
                <div className="hero-actions">
                    <button className="hero-button">Stats</button>
                    <button className="hero-button">Abilities</button>
                    <button className="hero-button">Items</button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
