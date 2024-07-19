'use client';

import {QueryClientProvider, type QueryClient} from '@tanstack/react-query';
import {getFetch, httpBatchLink, loggerLink, unstable_httpBatchStreamLink} from '@trpc/client';
import {createTRPCReact} from '@trpc/react-query';
import {type inferRouterInputs, type inferRouterOutputs} from '@trpc/server';
import {useState} from 'react';
import SuperJSON from 'superjson';

import {type AppRouter} from '@/server/api/root';
import {createQueryClient} from './query-client';
import {temptoken} from '@/app/_context/AuthProvider';

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
    if (typeof window === 'undefined') {
        // Server: always make a new query client
        return createQueryClient();
    }
    // Browser: use singleton pattern to keep the same query client
    return (clientQueryClientSingleton ??= createQueryClient());
};

export const api = createTRPCReact<AppRouter>();

export type RouterInputs = inferRouterInputs<AppRouter>;

export type RouterOutputs = inferRouterOutputs<AppRouter>;

export function TRPCReactProvider(props: {children: React.ReactNode}) {
    const queryClient = getQueryClient();
    let token = typeof window !== 'undefined' ? sessionStorage.getItem('access_token') : (temptoken ?? null);

    const [trpcClient] = useState(() =>
        api.createClient({
            links: [
                loggerLink({
                    enabled: () => (process.env.NODE_ENV == 'development' ? true : false),
                }),
                httpBatchLink({
                    transformer: SuperJSON,
                    url: getBaseUrl() + '/api/trpc',
                    headers: () => {
                        const headers = new Headers();
                        if (token) {
                            headers.set('Authorization', `Bearer ${token}`);
                        } else if (!token) {
                            const token = getAccessToken();
                            headers.set('Authorization', `Bearer ${token}`);
                        }
                        return headers;
                    },
                    fetch: async (input, init?) => {
                        const fetch = getFetch();
                        return fetch(input, {
                            ...init,
                            credentials: 'include',
                        });
                    },
                }),
            ],
        }),
    );

    return (
        <QueryClientProvider client={queryClient}>
            <api.Provider
                client={trpcClient}
                queryClient={queryClient}
            >
                {props.children}
            </api.Provider>
        </QueryClientProvider>
    );
}

function getBaseUrl() {
    if (typeof window !== 'undefined') return window.location.origin;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return `http://localhost:${process.env.PORT ?? 3000}`;
}

function getAccessToken() {
    if (typeof window !== 'undefined') {
        const token = sessionStorage.getItem('access_token');
        return token;
    }
}
