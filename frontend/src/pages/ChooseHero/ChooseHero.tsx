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

        console.log('Selected Hero ID:', heroId);

        try {
            await selectHero(user.id, heroId);
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
            <div className="hero-list">
                {heroes.map((hero) => (
                    <div
                        key={hero.id}
                        className="hero-card"
                        onClick={() => handleSelectHero(hero.id)}
                    >
                        <img
                            src={hero.imagePath || '/default-hero.png'}
                            alt={hero.name}
                            className="hero-image"
                        />
                        <h2 className="hero-name">{hero.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChooseHero;
