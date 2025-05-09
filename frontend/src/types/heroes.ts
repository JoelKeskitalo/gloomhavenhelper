export interface Hero {
    id: string;
    class: string;
    healthPerLevel: number[];
    imagePath?: string;
}

export interface HeroResponse {
    _id: string;
    class: string;
    healthPerLevel: number[];
    imagePath?: string;
}
