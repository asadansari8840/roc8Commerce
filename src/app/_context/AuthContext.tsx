'use client';
import {createContext} from 'react';

export const initialAuthState = {
    isAuthenticated: false,
    user: undefined,
    isLoading: true,
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const setIsAuthenticated = () => {};

export type User = {
    email: string;
    id: string;
    name: string;
    isVerified?: boolean;
    password: string;
};

type AuthContext = {
    isAuthenticated: boolean;
    isLoading: boolean;
    user?: User | null | undefined;
    setIsAuthenticated: (user: User | null, accessToken: string | null) => void;
};

export const AuthContext = createContext<AuthContext>({...initialAuthState, setIsAuthenticated});
