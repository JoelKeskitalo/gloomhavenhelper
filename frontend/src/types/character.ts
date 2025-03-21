import { Hero } from './heroes';

export interface Character {
    id?: string;
    name: string;
    heroId: Hero; // Populated from backend
    level: number;
    experience: number;
    gold: number;
    health: number;
    stamina?: number;
    abilities: string[];
    items: string[]; // IDs of items (not populated)
    perks: string[];
    user: string; // User ID
    imagePath?: string;
    createdAt: string;
}
