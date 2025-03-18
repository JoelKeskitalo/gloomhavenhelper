export interface Hero {
    id: string;
    name: string;
    class: string;
    healthPerLevel: number[];
    imagePath?: string;
}

export interface HeroResponse {
    _id: string;
    name: string;
    class: string;
    healthPerLevel: number[];
    imagePath?: string;
}
