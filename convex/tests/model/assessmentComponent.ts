import { ConvexError } from "convex/values";
import { Doc, Id } from "#_generated/dataModel";
import { DbWriter, DbReader,lastorderIdx } from "#helpers/types";

/** Create assessment component*/
export async function create(
  db: DbWriter,
  body: Pick<Doc<"assessmentComponents">, "name" | "totalAllotedMarks"| "passingMarks" | "orderIdx">,
) {
    return await db.insert("assessmentComponents", {
      ...body,
      createdAt: Date.now(),
      orderIdx: lastorderIdx+1,
    });
}
/**
 **Update assessment component**
 */
export async function update(
    db:DbWriter,
    id:Id<"assessmentComponents">,
    body: Pick<Doc<"assessmentComponents">,"name" | "totalAllotedMarks" | "passingMarks" >,
){
        return await db.patch(id,{ 
            ...body,
            updatedAt:Date.now(),
        });
    }