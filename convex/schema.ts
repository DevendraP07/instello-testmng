import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  }),
  todo: defineTable({
    name: v.string(),
    isCompleted: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  }),
});
