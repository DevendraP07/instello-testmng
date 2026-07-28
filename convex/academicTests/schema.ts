import { defineTable } from "convex/server";
import { v } from "convex/values";

export const testsTables = {
  assessmentSchemas: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  }),

  assessmentComponents: defineTable({
    name: v.string(),
    totalAllotedMarks: v.number(),
    passingMarks: v.number(),
    orderIdx: v.number(),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  }),
};
