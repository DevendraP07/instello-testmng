import { ConvexError } from "convex/values";
import { Doc, Id } from "#_generated/dataModel";
import { DbWriter, DbReader } from "#helpers/types";

function normalizedName(name:string){ return name.replaceAll(" ","").toLowerCase();}

/** Create assessment schema */
export async function create(
  db: DbWriter,
  body: Pick<Doc<"assessmentSchemas">, "name" | "description">,
) {
  return await db.insert("assessmentSchemas", {
    ...body,
    normalizedName:normalizedName(body.name),
    createdAt: Date.now(),
  });
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

/** **Verify assessment schema already exists or not** */
export async function isExists(db:DbReader,name:string,) {
  return await db.query("assessmentSchemas").withIndex("by_normalizedName",(q)=>q.eq("normalizedName",normalizedName(name)),
).first();
  
}