import { Character } from './character';

export interface User {
    id: string;
    email: string;
    password: string;
    isAdmin: boolean;
    character?: Character;
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
