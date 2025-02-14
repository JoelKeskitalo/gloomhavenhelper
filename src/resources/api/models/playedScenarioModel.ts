export interface PlayedScenario {
    id: string;
    userId: string;
    scenarioId: string;
    playedAt: Date;
    receivedItems: string[];
    receivedExperience: number;
    recievedGold: number;
    success: boolean;
    perks?: string[];
}
