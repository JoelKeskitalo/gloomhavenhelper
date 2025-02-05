export interface Monster {
    id: string;
    name: string;
    rank: "Normal" | "Elite";
    health: number;
    move: number;
    attack: number;
    range?: number;
    level: number;
    traits: string[];
    abilities: string[];
}