export type StartsWithLowercase<S> = S extends string
  ? Extract<S, Uncapitalize<S>>
  : never;
