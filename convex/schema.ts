import { defineSchema } from "convex/server";
import { testsTables } from "./tests/schema";

export default defineSchema({
  ...testsTables,
});
