import brcypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type {UserResponseType} from '../types';

type tokenType = {
    email: string;
    id: number;
    name: string;
};

export const hashPassword = (userEnteredPassword: string) => {
    return brcypt.hash(userEnteredPassword, 10);
};

export const verifyPassword = (userEnteredPassword: string, hashedPassword: string) => {
    return brcypt.compare(userEnteredPassword, hashedPassword);
};

export const generateAccessToken = (user: tokenType) => {
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_JWT_SECRET, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE || '15m',
    });
    return accessToken;
};

export const generateRefreshToken = (user: tokenType) => {
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_JWT_SECRET, {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE || '7d',
    });
    return refreshToken;
};

export const verifyAccessToken = (token: string) => {
    try {
        return jwt.verify(token, process.env.ACCESS_TOKEN_JWT_SECRET) as UserResponseType;
    } catch (error) {
        return null;
    }
};

export const verifyRefreshToken = (token: string) => {
    try {
        const userInfo = jwt.verify(token, process.env.REFRESH_TOKEN_JWT_SECRET) as UserResponseType;
        return userInfo;
    } catch (error) {
        return null;
    }
};
