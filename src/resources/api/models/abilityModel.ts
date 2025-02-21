export interface Ability {
    id: string;
    name: string;
    heroId: string; // Kopplad till en specifik hjälte
    initiative: number;
    effects?: string[];
    element?: 'Fire' | 'Ice' | 'Air' | 'Earth' | 'Light' | 'Dark' | null;
    imagePath?: string;
}
