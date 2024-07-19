import type {ResponseCookie} from 'next/dist/compiled/@edge-runtime/cookies';
import {generateAccessToken, generateRefreshToken} from './auth-helper';
import {cookies} from 'next/headers';

export type user = {
    id: number;
    name: string;
    email: string;
    password: string;
    isVerified: boolean;
};
export const sendUser = (user: user, message?: string) => {
    const {email, id, name} = user;
    const accessToken = generateAccessToken({email, id, name});
    const refreshToken = generateRefreshToken({email, id, name});
    const cookieOptions: Partial<ResponseCookie> = {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000,
    };
    cookies().set('refresh_token', refreshToken, cookieOptions);

    return {
        user: user,
        accessToken: accessToken,
        isAuthenticated: true,
        message: message ?? null,
    };
};
