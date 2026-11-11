import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
    args: {
        email: v.string(),
        userName: v.string(),
        imageUrl: v.string()
    },
    handler: async (ctx, args) => {
        //if user already exist
        const user = await ctx.db.query('users')
            .filter((q) => q.eq(q.field('email'), args.email))
            .collect();

        if (user?.length == 0) {
            await ctx.db.insert('users', {
                email: args.email,
                userName: args.userName,
                imageUrl: args.imageUrl,
                upgrade: false,
                isTeacher: false
            });

            return 'Inserted New User...'
        }

        return 'User Already Exist'

        //if not, ten insert new user entry
    }
})

export const userUpgradePlan = mutation({
    args: {
        userEmail: v.string()
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.query('users').filter(q => q.eq(q.field('email'), args.userEmail)).collect();

        if (result) {
            await ctx.db.patch(result[0]._id, { upgrade: true });
            return 'success'
        }
        return 'error'
    }
})

export const setTeacherRole = mutation({
    args: {
        userEmail: v.string(),
        isTeacher: v.boolean()
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.query('users').filter(q => q.eq(q.field('email'), args.userEmail)).collect();

        if (result && result.length > 0) {
            await ctx.db.patch(result[0]._id, { isTeacher: args.isTeacher });
            return 'success'
        }
        return 'error'
    }
})

export const GetUserInfo = query({
    args: {
        userEmail: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        if (!args.userEmail) {
            return;
        }
        const result = await ctx.db.query('users').filter(q => q.eq(q.field('email'), args?.userEmail)).collect();
        return result[0];
    }
})