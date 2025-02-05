export interface Ability {
    id: string;
    name: string;
    type: string;
    value?: number; 
    range?: number;
    effects?: string[];
    element?: string | null; 
}