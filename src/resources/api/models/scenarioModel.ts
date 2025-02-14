export interface Scenario {
    id: string;
    name: string;
    description: string;
    location: string;
    rewards?: string;
    requirements?: string;
    completed: boolean;
}
