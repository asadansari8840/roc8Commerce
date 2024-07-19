import {authProcedure, createTRPCRouter} from '@/server/api/trpc';
import {z} from 'zod';
import {TRPCError} from '@trpc/server';

const obj = z.object({
    page: z.number().min(1).default(1),
});
export const categoryRouter = createTRPCRouter({
    getCategories: authProcedure.input(obj).query(async ({ctx, input}) => {
        const user = await ctx.db.user.findUnique({where: {email: ctx.user.email}});
        if (!user) {
            return {
                categories: [],
                currentPage: 1,
                totalPages: 1,
            };
        }
        const perPage = 6;
        const {page} = input;
        const skip = (page - 1) * perPage;

        // Fetch total number of categories to calculate total pages
        const totalCategories = await ctx.db.category.count();
        const totalPages = Math.ceil(totalCategories / perPage);

        const categories = await ctx.db.category.findMany({
            skip,
            take: perPage,
        });
        // Fetch user interests from ctx.user
        const userInterests = user.interests || [];
        const userInterestSet = new Set(userInterests);

        // Map categories to include `isSavedByUser` field
        const categoryResponse = categories.map((category) => ({
            id: category.id,
            name: category.name,
            isSavedByUser: userInterestSet.has(category.id),
        }));

        return {
            categories: categoryResponse,
            currentPage: page,
            totalPages,
        };
    }),
    saveUnsaveCategory: authProcedure.input(z.object({categoryId: z.number().min(1)})).mutation(async ({ctx, input}) => {
        const {categoryId} = input;
        const userEmail = ctx.user.email;
        let isAdding = false;

        const user = await ctx.db.user.findUnique({where: {email: userEmail}});
        if (!user) {
            throw new TRPCError({message: 'User not found', code: 'UNAUTHORIZED'});
        }

        const currentInterests = user.interests || [];
        const interestSet = new Set(currentInterests);

        if (interestSet.has(categoryId)) {
            // Removeing categoryId from interests if it exists
            interestSet.delete(categoryId);
        } else {
            isAdding = true;
            // Adding categoryId to interests if it does not exist
            interestSet.add(categoryId);
        }

        // Update user interests
        await ctx.db.user.update({
            where: {email: userEmail},
            data: {interests: Array.from(interestSet)},
        });

        return {
            success: true,
            message: isAdding ? 'Category added successfully' : 'Category removed successfully',
            interests: Array.from(interestSet),
        };
    }),
});
