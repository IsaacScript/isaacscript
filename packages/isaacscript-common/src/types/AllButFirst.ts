/** Helper type to create a new tuple containing all but the first element of another tuple. */
export type AllButFirst<T extends unknown[]> = T extends [
  unknown,
  ...infer Tail,
] ? Tail :
  unknown[];
