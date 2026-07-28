import { Doc, Id } from "#_generated/dataModel";
import { DbWriter } from "#helpers/types";

/** Create assessment component*/
export async function create(
  db: DbWriter,
  assessmentSchemaId: Id<"assessmentSchemas">,
  body: Pick<
    Doc<"assessmentComponents">,
    "name" | "totalAllotedMarks" | "passingMarks"
  >,
) {
  const latest = await db
    .query("assessmentComponents")
    .withIndex("by_assessmentSchema_orderIdx", (q) =>
      q.eq("assessmentSchemaId", assessmentSchemaId),
    )
    .order("desc")
    .first();

  const nextOrderIdx = latest ? latest.orderIdx + 1 : 0;

  return await db.insert("assessmentComponents", {
    ...body,
    assessmentSchemaId,
    createdAt: Date.now(),
    orderIdx: nextOrderIdx,
  });
}

/** Update assessment component */
export async function update(
  db: DbWriter,
  id: Id<"assessmentComponents">,
  body: Partial<
    Pick<
      Doc<"assessmentComponents">,
      "name" | "totalAllotedMarks" | "passingMarks"
    >
  >,
) {
  return await db.patch(id, {
    ...body,
    updatedAt: Date.now(),
  });
}
