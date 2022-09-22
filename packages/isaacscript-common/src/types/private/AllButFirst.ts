export type AllButFirst<T extends unknown[]> = T extends [
  unknown,
  ...infer Tail,
]
  ? Tail
  : unknown[];
