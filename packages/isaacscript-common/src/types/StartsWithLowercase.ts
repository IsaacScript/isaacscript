/** Helper type to ensure that the given string starts with an lowercase letter. */
export type StartsWithLowercase<S> = S extends string ?
  Extract<S, Uncapitalize<S>> :
  never;
