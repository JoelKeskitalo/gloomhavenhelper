export interface User {
    id: string;
    email: string;
    password: string;
    character: Character; // a specific character, tied to the account
    playedScenarios: PlayedScenario[];
    settings: UserSettings; // user specific preferences
    createdAt: Date;
    imagePath?: string;
}
