import { ConvexError, v } from "convex/values";
import { mutation } from "#_generated/server";
import {
  insertAssessmentComponentValidator,
  insertAssessmentSchemaValidator,
  updateAssessmentComponentValidator,
} from "./validators";
import * as AssessmentSchema from "./model/assessmentSchema";
import * as AssessmentComponent from "./model/assessmentComponent";

/** **Create assessment schema** */
export const createAssessmentSchema = mutation({
  args: insertAssessmentSchemaValidator,
  returns: v.id("assessmentSchemas"),
  handler: async (ctx, args) => {
    return await AssessmentSchema.create(ctx.db, args);
  },
});

/** **Add assessment component to the assessment schema** */
export const addAssessmentComponent = mutation({
  args: insertAssessmentComponentValidator,
  returns: v.id("assessmentComponents"),
  handler: async (ctx, args) => {
    return await AssessmentComponent.create(
      ctx.db,
      args.assessmentSchemaId,
      args.body,
    );
  },
});

/**
 * **Re-order the assessment component position**
 */
export const reorderAssessmentComponent = mutation({
  args: {},
  returns: {},
  handler: async (ctx, args) => {
    throw new ConvexError("Not implemented");
  },
});

/**
 * **Update assessment component details**
 */
export const updateAssessmentComponent = mutation({
  args: updateAssessmentComponentValidator,
  handler: async (ctx, args) => {
    const isAvaliable = await ctx.db.get(args.id);

    if (!isAvaliable)
      throw new ConvexError("Assessment component not available");

    await AssessmentComponent.update(ctx.db, args.id, args.body);
  },
});
