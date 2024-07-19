import {authProcedure, createTRPCRouter, publicProcedure} from '@/server/api/trpc';
import {cookies} from 'next/headers';
import {createUserSchema, loginUserSchema} from '@/lib/user-schema';
import {hashPassword, verifyPassword, verifyRefreshToken} from '@/server/helpers/auth-helper';
import {sendUser} from '@/server/helpers/send-user';
import {TRPCError} from '@trpc/server';
import {z} from 'zod';

export const userRouter = createTRPCRouter({
    login: publicProcedure.input(loginUserSchema).mutation(async ({ctx, input}) => {
        const user = await ctx.db.user.findUnique({
            where: {email: input.email},
        });
        if (!user || !(await verifyPassword(input.password, user.password))) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'Invalid email or password',
            });
        }

        return sendUser(user);
    }),
    signup: publicProcedure.input(createUserSchema).mutation(async ({ctx, input}) => {
        try {
            const hashedPassword = await hashPassword(input.password);
            const user = await ctx.db.user.create({
                data: {
                    ...input,
                    password: hashedPassword,
                },
            });
            return sendUser(user);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (error.code == 'P2002') {
                throw new TRPCError({
                    code: 'CONFLICT',
                    message: 'Email already exists',
                });
            }
            throw error;
        }
    }),
    refresh: publicProcedure.query(async ({ctx}) => {
        const refreshToken = cookies().get('refresh_token');
        const tokenValue = verifyRefreshToken(refreshToken?.value ?? '');
        if (!refreshToken?.value || !tokenValue) {
            throw new TRPCError({code: 'UNAUTHORIZED'});
        }
        //check from db also is user present or not !!
        const user = await ctx.db.user.findUnique({
            where: {
                email: tokenValue.email,
            },
        });

        if (!user) {
            throw new TRPCError({code: 'NOT_FOUND', message: 'User not found'});
        }

        return sendUser(user);
    }),
    logout: publicProcedure.mutation(async () => {
        cookies().delete('refresh_token');
        return {
            message: 'Logged out successfully',
        };
    }),
    verifyUser: authProcedure.input(z.object({otp: z.string().length(8)})).mutation(async ({ctx, input}) => {
        const isValidUser = await ctx.db.user.findUnique({
            where: {email: ctx.user.email},
        });
        if (!isValidUser) {
            throw new TRPCError({code: 'NOT_FOUND', message: 'User not found'});
        }
        // not to be used in production !
        if (input.otp == '00000000') {
            await ctx.db.user.update({
                where: {
                    email: isValidUser.email,
                },
                data: {isVerified: true},
            });
            return sendUser(isValidUser, 'Verified successfully');
        } else {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'Please enter a valid otp',
            });
        }
    }),
});
