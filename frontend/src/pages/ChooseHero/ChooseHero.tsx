import { useEffect, useState } from 'react';
import { useAuthSelector, useAuthDispatch } from '../../redux/store';
import { useNavigate, Navigate } from 'react-router-dom';
import { fetchHeroes, selectHero } from '../../api/heroes';
import { fetchUser } from '../../redux/thunks/authThunks';
import { Hero } from '../../types/heroes';
import './ChooseHero.scss';

const ChooseHero = () => {
    const [heroes, setHeroes] = useState<Hero[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [characterName, setCharacterName] = useState('');

    const dispatch = useAuthDispatch();
    const user = useAuthSelector((state) => state.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        const getHeroes = async () => {
            try {
                const data = await fetchHeroes();
                setHeroes(data);
            } catch (err) {
                setError('Failed to fetch heroes');
            }
        };
        getHeroes();
    }, []);

    const handleSelectHero = async (heroId: string) => {
        if (!user || !user.id) {
            setError('User not found. Please login again.');
            return;
        }

        if (!characterName.trim()) {
            setError('Please enter a character name');
            return;
        }

        try {
            await selectHero(heroId, characterName);
            await dispatch(fetchUser(user.id));
            navigate('/account');
        } catch (err) {
            setError('Failed to select hero');
        }
    };

    if (user?.character) {
        return <Navigate to="/account" />;
    }

    return (
        <div className="choose-hero-container">
            <h1 className="choose-hero-title">Choose Your Hero</h1>
            {error && <p className="error-message">{error}</p>}

            <input
                type="text"
                placeholder="Enter your character's name"
                className="hero-name-input"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
            />

            <div className="hero-list">
                {heroes.map((hero) => (
                    <div
                        key={hero.id}
                        className="hero-card"
                        onClick={() => handleSelectHero(hero.id)}
                    >
                        <img
                            src={hero.imagePath || '/default-hero.png'}
                            alt={hero.class}
                            className="hero-image"
                        />
                        <h2 className="hero-name">{hero.class}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChooseHero;
