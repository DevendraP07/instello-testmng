import { query } from "#_generated/server";
import { ConvexError, v } from "convex/values";

/** **Get assessment schema** */
export const getAssessmentSchema = query({
  args: {
    id: v.id("assessmentSchemas"),
  },
  returns: {
    _id: v.id("assessmentSchema"),
    name: v.string(),
    description: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    throw new ConvexError("Not implemented yet");
  },
});
