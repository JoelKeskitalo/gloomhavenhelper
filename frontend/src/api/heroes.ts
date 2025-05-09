import axios from 'axios';

import { Hero, HeroResponse } from '../types/heroes';

export const fetchHeroes = async (): Promise<Hero[]> => {
    try {
        const response = await axios.get<HeroResponse[]>('/api/heroes');
        return response.data.map((hero) => ({
            id: hero._id,
            class: hero.class,
            healthPerLevel: hero.healthPerLevel,
            imagePath: hero.imagePath,
        }));
    } catch (error: unknown) {
        const err = error as Error & { response?: { data?: { message?: string } } };
        throw new Error(err.response?.data?.message || 'Failed to fetch heroes');
    }
};

export const selectHero = async (heroId: string, characterName: string): Promise<void> => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Unauthorized: No token found');
        }

        await axios.patch(
            `/api/heroes/${heroId}/choose-hero`,
            { characterName },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    } catch (error: unknown) {
        const err = error as Error & { response?: { data?: { message?: string } } };
        throw new Error(err.response?.data?.message || 'Failed to select hero');
    }
};
