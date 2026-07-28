import { ConvexError, v } from "convex/values";
import { mutation } from "#_generated/server";
import {
  InsertAssessmentComponent,
  InsertAssessmentSchema,
} from "./validators";
import * as AssessmentSchema from "./model/assessmentSchema";
import * as AssessmentComponent from "./model/assessmentComponent"

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
    return await AssessmentComponent.create(ctx.db,args)
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
  args: {id:v.id("assessmentComponents"), newName:v.string(),newPassingMarks:v.number(),newTotalAllotedMarks:v.number()},
  handler: async (ctx, args) => {
    const isAvaliable= await ctx.db.get(args.id)
    if(!isAvaliable)
      throw new ConvexError("Assessment component not available");
    await AssessmentComponent.update(ctx.db,args.id,{
      name:args.newName,
      passingMarks:args.newPassingMarks,
      totalAllotedMarks:args.newTotalAllotedMarks,
    });
  },
});
