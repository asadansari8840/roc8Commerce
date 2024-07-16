'use client';
import {createContext} from 'react';

export const initialAuthState = {
    isAuthenticated: false,
    user: undefined,
    isLoading: true,
};

const setIsAuthenticated = (user: any, accessToken: string | null) => {};

type User = {
    email: string;
    id: string;
    name: string;
    password: string;
    refreshToken: string;
};

type AuthContext = {
    isAuthenticated: boolean;
    isLoading: boolean;
    user?: User;
    setIsAuthenticated: (user: any, accessToken: string | null) => void;
};

export const AuthContext = createContext<AuthContext>({...initialAuthState, setIsAuthenticated});
