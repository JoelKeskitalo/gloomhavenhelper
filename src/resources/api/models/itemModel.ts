export interface Item {
    id: string;
    name: string;
    type: string; // weapon, armor, consumable, etc.
    effect: string;
    cost: number;
    uses?: number; // amount of time the item can be used, if any
    imagePath?: string;
}
