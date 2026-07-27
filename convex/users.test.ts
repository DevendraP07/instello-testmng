import { it, describe, expect } from "vitest";
import { modules } from "./test.setup";
import { api } from "./_generated/api";
import schema from "./schema";
import { convexTest } from "convex-test";

describe("users.create", () => {
  const mockUser = {
    name: "Jhon Doe",
    email: "jhon@gmail.com",
  };

  it("should create user", async () => {
    const t = convexTest(schema, modules);
    const insertedId = await t.mutation(api.users.create, mockUser);

    const insertedUser = await t.run((c) => {
      return c.db
        .query("users")
        .filter((q) => q.eq(q.field("_id"), insertedId))
        .first();
    });

    expect(insertedUser).toMatchObject(mockUser);
  });
});
