import { ConvexError, v } from "convex/values";
import { mutation } from "#_generated/server";
import {
  InsertAssessmentComponent,
  InsertAssessmentSchema,
} from "./validators";
import * as AssessmentSchema from "./model/assessmentSchema";

/**
 * **Create assessment schema**
 * Assessment schema is format for conduct the test
 */
export const createAssessmentSchema = mutation({
  args: InsertAssessmentSchema,
  returns: v.id("assessmentSchemas"),
  handler: async (ctx, args) => {
    return await AssessmentSchema.create(ctx.db, args);
  },
});

/**
 * **Create assessment component**
 * Creates component which holds contraints of validation
 */
export const createAssessmentComponent = mutation({
  args: InsertAssessmentComponent,
  returns: v.id("assessmentComponents"),
  handler: async (ctx, args) => {
    throw new ConvexError("Not implemented");
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
  args: {},
  returns: {},
  handler: async (ctx, args) => {
    throw new ConvexError("Not implemented");
  },
});
