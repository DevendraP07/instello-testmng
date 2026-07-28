import { defineSchema } from "convex/server";
import { testsTables } from "./academicTests/schema";

export default defineSchema({
  ...testsTables,
});
