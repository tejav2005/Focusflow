
import { mutation, query } from "./_generated/server";

export const logAttention = mutation({
  args: { sessionId: String, focusScore: Number },
  handler: async (ctx, args) => {
    await ctx.db.insert("attentionLogs", {
      sessionId: args.sessionId,
      focusScore: args.focusScore,
      timestamp: Date.now(),
    });
  },
});

export const getSessionAttention = query({
  args: { sessionId: String },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("attentionLogs")
      .filter(q => q.eq(q.field("sessionId"), args.sessionId))
      .collect();
  },
});
