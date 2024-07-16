"use client";
import {useEffect} from 'react';
import {useSession} from '../_context/AuthProvider';
import {useRouter} from 'next/navigation';

export const useIsPublic = () => {
    const router = useRouter();
    const {isAuthenticated, isLoading} = useSession();
    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, isLoading]);
};

export const useIsPrivate = () => {
    const router = useRouter();
    const {isAuthenticated, isLoading} = useSession();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, isLoading]);
};
