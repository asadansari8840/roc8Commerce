'use client';
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from './AuthContext';
import {api} from '@/trpc/react';
import type {User} from './AuthContext';

type AuthState = {
    isAuthenticated: boolean;
    user: null | User;
    isLoading: boolean;
};
export let temptoken = '';
const AuthProvider = ({children}: {children?: React.ReactNode}) => {
    const [authState, setAuthState] = useState<AuthState>({isAuthenticated: false, isLoading: true, user: null});

    const setIsAuthenticated = (user: User | null, accessToken: string | null) => {
        if (!user && !accessToken) {
            temptoken = '';
            setAuthState({isAuthenticated: false, isLoading: false, user: null});
        }
        if (user && accessToken) {
            temptoken = accessToken;
            sessionStorage.setItem('access_token', accessToken);
            setAuthState({user, isAuthenticated: true, isLoading: false});
        }
    };

    const user = api.user.refresh.useQuery();

    useEffect(() => {
        if (user.data?.accessToken && !user.isLoading) {
            temptoken = user.data.accessToken;
            setIsAuthenticated(user.data.user as unknown as User, user.data.accessToken);
        } else if (user.isError) {
            temptoken = '';
            setAuthState({user: null, isAuthenticated: false, isLoading: false});
        }
    }, [user.isError, user.data, user.isLoading]);

    return (
        <AuthContext.Provider
            value={{
                ...authState,
                setIsAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useSession = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('Auth Context not found');
    }
    return context;
};
