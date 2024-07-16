import {TRPCError, initTRPC} from '@trpc/server';
import superjson from 'superjson';
import {ZodError} from 'zod';

import {db} from '@/server/db';
import {verifyAccessToken} from '../helpers/auth-helper';

export const createTRPCContext = async (opts: {headers: Headers}) => {
    return {
        db,
        ...opts,
    };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
    transformer: superjson,
    errorFormatter({shape, error}) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
            },
        };
    },
});

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

export const authProcedure = publicProcedure.use(async (opts) => {
    const {ctx} = opts;
    const accessToken = ctx.headers.get('Authorization')?.split(' ')[1];
    if (!accessToken) {
        throw new TRPCError({code: 'UNAUTHORIZED'});
    }
    const verify = verifyAccessToken(accessToken);
    if (!verify) {
        throw new TRPCError({code: 'UNAUTHORIZED'});
    }

    return opts.next({
        ctx: {
            user: verify,
        },
    });
});
