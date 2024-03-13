export type TupleToIntersection<T extends readonly unknown[]> =
  T extends readonly [infer F, ...infer R]
    ? F & TupleToIntersection<R>
    : unknown;
