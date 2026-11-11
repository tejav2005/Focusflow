import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({

    pdfFiles: defineTable({
        fileId: v.string(),
        storageId: v.string(),
        fileName: v.string(),
        fileUrl: v.string(),
        createdBy: v.string()
    }),

    users: defineTable({
        userName: v.string(),
        email: v.string(),
        imageUrl: v.string(),
        upgrade: v.boolean(),
        isTeacher: v.optional(v.boolean()),
    }),

    documents: defineTable({
        embedding: v.array(v.number()),
        text: v.string(),
        metadata: v.any(),
    }).vectorIndex("byEmbedding", {
        vectorField: "embedding",
        dimensions: 768,
    }),

    notes: defineTable({
        fileId: v.string(),
        notes: v.any(),
        createdBy: v.string(),
    }),

    // Teacher Dashboard tables
    sessions: defineTable({
        teacherId: v.string(),
        fileId: v.string(),
        startTime: v.number(),
        active: v.boolean(),
    }),

    attentionLogs: defineTable({
        sessionId: v.string(),
        focusScore: v.number(),
        timestamp: v.number(),
    }),

    adaptationEvents: defineTable({
        sessionId: v.string(),
        type: v.string(),
        timestamp: v.number(),
    }),

});