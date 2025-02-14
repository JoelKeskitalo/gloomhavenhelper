export interface Character {
    id: string;
    name: string;
    characterClass: string;
    level: number;
    experience: number;
    gold: number;
    health: number;
    stamina: number; // cards in hand, placeholder if interactice gameplay
    abilities: string[];
    items: string[];
    user: string; // id referencing user
    createdAt: Date;
}
