import { it, describe, expect } from "vitest";
import { modules } from "./test.setup";
import { api } from "./_generated/api";
import { Doc } from "./_generated/dataModel";
import schema from "./schema";
import { convexTest } from "convex-test";

describe("todo.create", () => {
  it("should create todo", async () => {
    // Arange
    const t = convexTest(schema, modules);

    // Act
    const insertedId = await t.mutation(api.todo.create, {
      name: "Go to market",
    });

    // Assert
    const insertedTodo = await t.run((c) => c.db.get(insertedId));
    expect(insertedTodo?.name).toBe("Go to market");
  });
});

describe("todo.list", () => {
  const mockTodos: Pick<Doc<"todo">, "name" | "isCompleted">[] = [
    {
      name: "Go to market",
      isCompleted: false,
    },
    {
      name: "Go to gym",
      isCompleted: true,
    },
    {
      name: "Order magazine",
      isCompleted: false,
    },
  ];

  it("should list first 10 todos", async () => {
    // Arange
    const t = convexTest(schema, modules);
    await t.run(async (c) => {
      await Promise.all(
        mockTodos.map((todo) =>
          c.db.insert("todo", { ...todo, createdAt: Date.now() }),
        ),
      );
    });

    // Act
    const allTodos = await t.query(api.todo.list, {});

    // Assert
    expect(allTodos).toMatchObject(mockTodos);
  });
});
