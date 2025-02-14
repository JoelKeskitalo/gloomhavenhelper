export interface Deck {
    id: string;
    name: string;
    userId: string; // connected to user
    cards: string[]; // ability cards & modifier cards
    itemIds: string[]; // lis
}
