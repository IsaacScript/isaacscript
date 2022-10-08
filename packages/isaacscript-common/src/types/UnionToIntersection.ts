/** Helper type to convert a union to an intersection. */
export type UnionToIntersection<U> = (
  U extends U ? (u: U) => 0 : never
) extends (i: infer I) => 0
  ? Extract<I, U>
  : never;
