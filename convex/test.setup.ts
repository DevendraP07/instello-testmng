/// <reference types="vite/client" />
import { test as baseTest } from "vitest";
import { convexTest } from "convex-test";
import schema from "#schema";

export const modules = import.meta.glob("./**/*.ts");

export const test = baseTest.extend("t", () => {
  return convexTest(schema, modules);
});
