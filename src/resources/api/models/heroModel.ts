export interface Hero {
    id: string;
    name: string;
    class: 'Hatchet' | 'Red Guard' | 'VoidWarden' | 'Demolitionist'; // Jaws of the Lion Classes
    healthPerLevel: number[];
    startingAbilities: string[];
    imagePath?: string;
}
