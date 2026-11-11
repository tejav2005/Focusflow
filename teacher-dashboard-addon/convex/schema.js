
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  sessions: defineTable({
    teacherId: String,
    fileId: String,
    startTime: Number,
    active: Boolean,
  }),
  attentionLogs: defineTable({
    sessionId: String,
    focusScore: Number,
    timestamp: Number,
  }),
  adaptationEvents: defineTable({
    sessionId: String,
    type: String,
    timestamp: Number,
  }),
});
