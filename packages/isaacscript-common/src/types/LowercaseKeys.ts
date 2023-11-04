import type { StartsWithLowercase } from "./StartsWithLowercase";

/** Helper type to match all of the lowercase keys of an object. */
export type LowercaseKeys<T> = StartsWithLowercase<keyof T>;
