import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

/** Create a user*/
export const create = mutation({
  args: { name: v.string(), email: v.string() },
  returns: v.id("users"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      createdAt: Date.now(),
    });
  },
});

/** Get user */
export const getById = query({
  args: { id: v.id("users") },
  returns: {
    _id: v.id("users"),
    email: v.string(),
    name: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  },
  handler: async (ctx, args) => {
    throw new ConvexError("Not implemented");
  },
});

/** Delete user */
export const remove = mutation({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    throw new ConvexError("Not implemented");
  },
});
