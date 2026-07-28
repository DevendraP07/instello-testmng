import { v } from "convex/values";

export const insertAssessmentSchemaValidator = v.object({
  name: v.string(),
  description: v.optional(v.string()),
});

export const insertAssessmentComponentValidator = v.object({
  name: v.string(),
  totalAllotedMarks: v.number(),
  passingMarks: v.number(),
  orderIdx: v.number(),
});

export const updateAssessmentComponentValidator = v.object({
  id: v.id("assessmentComponents"),
  body: v
    .object({
      name: v.string(),
      passingMarks: v.number(),
      totalAllotedMarks: v.number(),
    })
    .partial(),
});
