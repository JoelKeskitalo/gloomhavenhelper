export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    character: Character; // a specific character, tied to the account
    progress: Progress; // saves the progress in a seperate model
    settings: UserSettings; 
    createdAt: Date;
}