/** Helper type to create a new tuple containing all but the first element of another tuple. */
export type AllButFirst<T extends readonly unknown[]> = T extends readonly [
  unknown,
  ...infer Tail,
]
  ? Tail
  : unknown[];
