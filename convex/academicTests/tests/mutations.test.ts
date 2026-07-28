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
        normalizedName:mockAssessmentSchema.name
        .replaceAll(" ","")
        .toLowerCase(),
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




test("should not allow duplicate assessment schema", async ({ t }) => {
  // Arrange
  const body = {
    name: "I am Devendra",
    description: "Internal Test",
  };

  await t.mutation(
    api.academicTests.mutations.createAssessmentSchema,
    body,
  );

  // Act
  let error;

  try {
    await t.mutation(
      api.academicTests.mutations.createAssessmentSchema,
      {
        name: "I AM DEVENDRA",
        description: "Another Test",
      },
    );
  } catch (e) {
    error = e;
  }

  // Assert
  expect(error).toMatchObject({
    data: "Assessment schema already exists",
  });
});