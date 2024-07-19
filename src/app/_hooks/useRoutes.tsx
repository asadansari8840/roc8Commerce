'use client';
import {useEffect} from 'react';
import {useSession} from '../_context/AuthProvider';
import {useRouter} from 'next/navigation';

/**
 * A helper hook middleware for public pages so that they can only be accessible in non-authentication state
 */
export const useIsPublic = () => {
    const router = useRouter();
    const {isAuthenticated, isLoading} = useSession();
    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, isLoading]);
};

/**
 * A helper hook middleware for private pages so that they can only be accessible in authentication state
 */
export const useIsPrivate = () => {
    const router = useRouter();
    const {isAuthenticated, isLoading, user} = useSession();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
        } else if (!isLoading && isAuthenticated && !user?.isVerified) {
            router.push('/verify');
        } else if (!isLoading && isAuthenticated && user?.isVerified) {
            router.push('/');
        }
    }, [isAuthenticated, isLoading, user?.isVerified]);
};
