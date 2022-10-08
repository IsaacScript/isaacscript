/** Helper type to ensure that the given string starts with an uppercase letter. */
export type StartsWithUppercase<S> = S extends string
  ? Extract<S, Capitalize<S>>
  : never;
