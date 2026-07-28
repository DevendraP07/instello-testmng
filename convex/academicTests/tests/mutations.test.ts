import type {
  InsertAssessmentSchemaValidator,
  InsertAssessmentComponentValidator,
} from "#academicTests/validators";
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

    expect(assessmentSchema).toMatchObject(mockAssessmentSchema);
  });
});

describe("academicTests.addAssessmentComponent", () => {
  const mockAssessmentSchema: InsertAssessmentSchemaValidator = {
    name: "CIE1",
    description: "This is internal test 1",
  };

  const mockAssessmentComponents: InsertAssessmentComponentValidator["body"][] =
    [
      {
        name: "Written Test",
        passingMarks: 10,
        totalAllotedMarks: 20,
      },
      {
        name: "Observation",
        passingMarks: 5,
        totalAllotedMarks: 10,
      },
      {
        name: "Mini Project",
        passingMarks: 8,
        totalAllotedMarks: 16,
      },
    ];

  test("should create components in right order", async ({ t }) => {
    // Insert assessment schema
    const assessmentSchemaId = await t.run((c) =>
      c.db.insert("assessmentSchemas", {
        ...mockAssessmentSchema,
        createdAt: Date.now(),
      }),
    );

    await Promise.all(
      mockAssessmentComponents.map((component) =>
        t.mutation(api.academicTests.mutations.addAssessmentComponent, {
          body: component,
          assessmentSchemaId,
        }),
      ),
    );

    const assessmentComponents = await t.run((c) =>
      c.db.query("assessmentComponents").collect(),
    );

    expect(assessmentComponents).toMatchObject(
      mockAssessmentComponents.map((mac, orderIdx) => ({ ...mac, orderIdx })),
    );
  });
});
