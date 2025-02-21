export interface PlayedScenario {
    id: string;
    userId: string;
    scenarioId: string;
    playedAt: Date;
    receivedItems: string[];
    receivedExperience: number;
    receivedGold: number;
    success: boolean;
    perks?: string[];
}
