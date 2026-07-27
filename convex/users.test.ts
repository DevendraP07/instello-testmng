import { it, describe, expect } from "vitest";
import { modules } from "./test.setup";
import { api } from "./_generated/api";
import schema from "./schema";
import { convexTest } from "convex-test";

describe("users.create", () => {
  it("should create user", async () => {
    const t = convexTest(schema, modules);
    const insertedId = await t.mutation(api.users.create, {
      name: "Jhon Doe",
      email: "jhon@gmail.com",
    });

    const insertedUser = await t.run((c) => {
      return c.db
        .query("users")
        .filter((q) => q.eq(q.field("_id"), insertedId))
        .first();
    });

    expect(insertedUser?.name).toBe("Jhon Doe");
    expect(insertedUser?.email).toBe("jhon@gmail.com");
  });
});
