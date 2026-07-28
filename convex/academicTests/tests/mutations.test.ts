import type { InsertAssessmentSchemaValidator } from "#academicTests/validators";
import { test } from "#test.setup";
import { api } from "#_generated/api";

describe("academicTests.createAssessmentSchema", () => {
  const mockAssessmentSchema: InsertAssessmentSchemaValidator = {
    name: "CIE1",
    description: "This is internal test 1",
  };

  test("should create assessment schema", async ({ t }) => {
    const assessmentSchemaId = await t.mutation(
      api.academicTests.mutations.createAssessmentSchema,
      mockAssessmentSchema,
    );

    const assessmentSchema = await t.run((c) => c.db.get(assessmentSchemaId));

    console.log(assessmentSchema);
    expect(assessmentSchema).toMatchObject(mockAssessmentSchema);
  });
});
