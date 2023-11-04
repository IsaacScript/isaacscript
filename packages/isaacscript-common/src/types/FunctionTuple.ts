import type { AnyFunction } from "./AnyFunction";

/** Helper type to represent a tuple containing the name of a function and the function itself. */
export type FunctionTuple = [name: string, func: AnyFunction];
