import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

/** **Creates a todo** */
export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("todo", {
      name: args.name,
      createdAt: Date.now(),
      isCompleted: false,
    });
  },
});

/** **Lists first 10 todo's** */
export const list = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db.query("todo").take(10);
  },
});

/** Update name of the todo */
export const updateName = mutation({
  args: { id: v.id("todo"), newName: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.patch("todo", args.id, { name: args.newName });
  },
});

/** **Toggle compeleted flag of the todo** */
export const toggleCompeleted = mutation({
  args: { id: v.id("todo") },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);

    if (!todo) throw new ConvexError("Todo not exists");

    return await ctx.db.patch("todo", args.id, {
      isCompleted: !todo.isCompleted,
    });
  },
});

/** **Remove todo** */
export const remove = mutation({
  args: { id: v.id("todo") },
  handler: async (ctx, args) => {
    return ctx.db.delete("todo", args.id);
  },
});
