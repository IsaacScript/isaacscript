export type AllButLast<T extends unknown[]> = T extends [...infer Head, unknown]
  ? Head
  : unknown[];
