import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Log a student's focus score during a session
export const logAttention = mutation({
    args: {
        sessionId: v.string(),
        focusScore: v.number(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("attentionLogs", {
            sessionId: args.sessionId,
            focusScore: args.focusScore,
            timestamp: Date.now(),
        });
    },
});

// Get all attention logs for a session
export const getSessionAttention = query({
    args: { sessionId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("attentionLogs")
            .filter((q) => q.eq(q.field("sessionId"), args.sessionId))
            .collect();
    },
});

// Create a new teacher session
export const createSession = mutation({
    args: {
        teacherId: v.string(),
        fileId: v.string(),
    },
    handler: async (ctx, args) => {
        const sessionId = await ctx.db.insert("sessions", {
            teacherId: args.teacherId,
            fileId: args.fileId,
            startTime: Date.now(),
            active: true,
        });
        return sessionId;
    },
});

// End a teacher session
export const endSession = mutation({
    args: { sessionId: v.id("sessions") },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.sessionId, { active: false });
    },
});

// Get all sessions for a teacher
export const getTeacherSessions = query({
    args: { teacherId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("sessions")
            .filter((q) => q.eq(q.field("teacherId"), args.teacherId))
            .collect();
    },
});

// Log an adaptation event
export const logAdaptation = mutation({
    args: {
        sessionId: v.string(),
        type: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("adaptationEvents", {
            sessionId: args.sessionId,
            type: args.type,
            timestamp: Date.now(),
        });
    },
});

// Get adaptation events for a session
export const getAdaptationEvents = query({
    args: { sessionId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("adaptationEvents")
            .filter((q) => q.eq(q.field("sessionId"), args.sessionId))
            .collect();
    },
});

// Get all attention logs for a teacher (across all sessions)
export const getTeacherAttentionLogs = query({
    args: { teacherId: v.string() },
    handler: async (ctx, args) => {
        const sessions = await ctx.db
            .query("sessions")
            .filter((q) => q.eq(q.field("teacherId"), args.teacherId))
            .collect();

        const allLogs = [];
        for (const session of sessions) {
            const logs = await ctx.db
                .query("attentionLogs")
                .filter((q) => q.eq(q.field("sessionId"), session._id))
                .collect();
            allLogs.push(...logs.map(log => ({ ...log, fileId: session.fileId })));
        }
        return allLogs;
    },
});

// Get all adaptation events for a teacher (across all sessions)
export const getTeacherAdaptations = query({
    args: { teacherId: v.string() },
    handler: async (ctx, args) => {
        const sessions = await ctx.db
            .query("sessions")
            .filter((q) => q.eq(q.field("teacherId"), args.teacherId))
            .collect();

        const allEvents = [];
        for (const session of sessions) {
            const events = await ctx.db
                .query("adaptationEvents")
                .filter((q) => q.eq(q.field("sessionId"), session._id))
                .collect();
            allEvents.push(...events.map(ev => ({ ...ev, fileId: session.fileId })));
        }
        return allEvents;
    },
});
