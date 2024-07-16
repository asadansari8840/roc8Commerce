const ROUTES = {
    Home: '/',
    Login: '/login',
    Signin: '/signup',
} as const;

type RouteKeys = keyof typeof ROUTES;
export type ROUTES = (typeof ROUTES)[RouteKeys];

export default ROUTES;
