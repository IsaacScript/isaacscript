import type { StartsWithUppercase } from "./StartsWithUppercase";

/** Helper type to match all of the uppercase keys of an object. */
export type UppercaseKeys<T> = StartsWithUppercase<keyof T>;
