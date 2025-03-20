import axios from 'axios';

import { Hero, HeroResponse } from '../types/heroes';

export const fetchHeroes = async (): Promise<Hero[]> => {
    try {
        const response = await axios.get<HeroResponse[]>('/api/heroes');
        return response.data.map((hero) => ({
            id: hero._id,
            name: hero.name,
            class: hero.class,
            healthPerLevel: hero.healthPerLevel,
            imagePath: hero.imagePath,
        }));
    } catch (error: unknown) {
        const err = error as Error & { response?: { data?: { message?: string } } };
        throw new Error(err.response?.data?.message || 'Failed to fetch heroes');
    }
};

export const selectHero = async (userId: string, heroId: string): Promise<void> => {
    try {
        await axios.patch(`/api/heroes/${heroId}/choose-hero`, { userId });
    } catch (error: unknown) {
        const err = error as Error & { response?: { data?: { message?: string } } };
        throw new Error(err.response?.data?.message || 'Failed to select hero');
    }
};
