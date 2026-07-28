import { v } from "convex/values";

export const InsertAssessmentSchema = v.object({
  name: v.string(),
  description: v.optional(v.string()),
});

export const InsertAssessmentComponent = v.object({
  name: v.string(),
  totalAllotedMarks: v.number(),
  passingMarks: v.number(),
  orderIdx: v.number(),
});
