export interface Character {
    id: string;
    name: string;
    heroId: string; // connection to a specific hero
    level: number;
    experience: number;
    gold: number;
    health: number;
    stamina?: number; // amount of cards in hand, more of a placeholder for future expansion
    abilities: string[]; // a list of the ability cards
    items: string[]; // a list of the item cards
    perks: string[]; // unlocked perks
    user: string; // ID that references the UserModel
    imagePath?: string;
    createdAt: Date;
}
