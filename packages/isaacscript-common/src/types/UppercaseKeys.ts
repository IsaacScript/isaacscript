import { StartsWithUppercase } from "./StartsWithUppercase";

export type UppercaseKeys<T> = StartsWithUppercase<keyof T>;
