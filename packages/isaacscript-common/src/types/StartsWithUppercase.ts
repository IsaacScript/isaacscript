export type StartsWithUppercase<S> = S extends string
  ? Extract<S, Capitalize<S>>
  : never;
