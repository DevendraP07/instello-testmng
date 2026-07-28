/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as academicTests_model_assessmentComponent from "../academicTests/model/assessmentComponent.js";
import type * as academicTests_model_assessmentSchema from "../academicTests/model/assessmentSchema.js";
import type * as academicTests_mutations from "../academicTests/mutations.js";
import type * as academicTests_queries from "../academicTests/queries.js";
import type * as academicTests_validators from "../academicTests/validators.js";
import type * as helpers_types from "../helpers/types.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "academicTests/model/assessmentComponent": typeof academicTests_model_assessmentComponent;
  "academicTests/model/assessmentSchema": typeof academicTests_model_assessmentSchema;
  "academicTests/mutations": typeof academicTests_mutations;
  "academicTests/queries": typeof academicTests_queries;
  "academicTests/validators": typeof academicTests_validators;
  "helpers/types": typeof helpers_types;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
