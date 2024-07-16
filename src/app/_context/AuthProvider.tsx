'use client';
import {useContext, useEffect, useState} from 'react';
import {AuthContext, initialAuthState} from './AuthContext';
import {api} from '@/trpc/react';

const AuthProvider = ({children}: {children?: React.ReactNode}) => {
    const [authState, setAuthState] = useState(initialAuthState);

    const setIsAuthenticated = (user: any, accessToken: string | null) => {
        if (!user && !accessToken) {
            setAuthState({...initialAuthState, isLoading: false});
        }
        if (user && accessToken) {
            sessionStorage.setItem('access_token', accessToken);
            setAuthState({user, isAuthenticated: true, isLoading: false});
        }
    };

    const user = api.user.refresh.useQuery();

    useEffect(() => {
        if (user.data?.accessToken && !user.isLoading) {
            setIsAuthenticated(user.data.user, user.data.accessToken);
        } else if (user.isError) {
            setAuthState({...initialAuthState, isLoading: false});
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
