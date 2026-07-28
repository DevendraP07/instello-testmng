import { Infer, v } from "convex/values";

export const insertAssessmentSchemaValidator = v.object({
  name: v.string(),
  description: v.optional(v.string()),
});

export type InsertAssessmentSchemaValidator = Infer<
  typeof insertAssessmentSchemaValidator
>;

export const insertAssessmentComponentValidator = v.object({
  body: v.object({
    name: v.string(),
    totalAllotedMarks: v.number(),
    passingMarks: v.number(),
  }),
  assessmentSchemaId: v.id("assessmentSchemas"),
});

export type InsertAssessmentComponentValidator = Infer<
  typeof insertAssessmentComponentValidator
>;

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
