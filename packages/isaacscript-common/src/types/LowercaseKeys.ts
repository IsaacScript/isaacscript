import { StartsWithLowercase } from "./StartsWithLowercase";

export type LowercaseKeys<T> = StartsWithLowercase<keyof T>;
