export type StartsWithLowercase<T> =
  T extends `${infer FirstCharacter}${string}`
    ? FirstCharacter extends Lowercase<FirstCharacter>
      ? T
      : never
    : never;
