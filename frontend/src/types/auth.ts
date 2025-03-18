export interface User {
    id: string;
    username: string;
    email: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

export interface RegisterPayload {
    username: string;
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
