import { defineSchema } from "convex/server";
import { academicTestsTables } from "./academicTests/schema";

export default defineSchema({
  ...academicTestsTables,
});
