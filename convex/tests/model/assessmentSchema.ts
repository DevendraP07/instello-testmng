import { ConvexError } from "convex/values";
import { Doc, Id } from "#_generated/dataModel";
import { DbWriter, DbReader } from "#helpers/types";

/** Create assessment schema
 * @throws an error if unable to create one*/
export async function create(
  db: DbWriter,
  body: Pick<Doc<"assessmentSchemas">, "name" | "description">,
) {
  try {
    return await db.insert("assessmentSchemas", {
      ...body,
      createdAt: Date.now(),
    });
  } catch (e) {
    throw new ConvexError("Unable to create assessment schema");
  }
}

/** Find assessment record or returns null */
export async function find(db: DbReader, id: Id<"assessmentSchemas">) {
  return await db.get(id);
}

/** Find assessment schema record or throw an error */
export async function findOrThrow(db: DbReader, id: Id<"assessmentSchemas">) {
  const record = await db.get(id);
  if (!record) throw new ConvexError("No assessment schema record found");

  return record;
}
