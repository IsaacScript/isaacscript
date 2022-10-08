/** Helper type to convert a tuple to a union. */
export type TupleToUnion<T extends unknown[]> = T[number];
