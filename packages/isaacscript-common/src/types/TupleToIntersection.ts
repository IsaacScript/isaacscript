export type TupleToIntersection<T extends unknown[]> = T extends [
  infer F,
  ...infer R,
] ? F & TupleToIntersection<R> :
  unknown;
