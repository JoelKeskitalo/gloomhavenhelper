export interface Deck {
    id: string;
    owner: string; // user id
    cards: string[]; // a list of card id's
}