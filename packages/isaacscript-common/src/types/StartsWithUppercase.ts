export type StartsWithUppercase<T> =
  T extends `${infer FirstCharacter}${string}`
    ? FirstCharacter extends Uppercase<FirstCharacter>
      ? T
      : never
    : never;
