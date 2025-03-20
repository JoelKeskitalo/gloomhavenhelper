export interface User {
    id: string;
    email: string;
    password: string;
    character?: string;
    playedScenarios?: string[];
    settings?: {
        enableDarkMode: boolean;
        preferredLanguage: string;
    };
    token?: string;
}
export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

export interface RegisterPayload {
    email: string;
    password: string;
}

export interface RegisterResponse {
    user: User;
    token: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    user: User;
    token: string;
}
