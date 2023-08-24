/** Helper type to create a new tuple containing all but the last element of another tuple. */
export type AllButLast<T extends unknown[]> = T extends
  [...infer Head, unknown] ? Head :
  unknown[];
