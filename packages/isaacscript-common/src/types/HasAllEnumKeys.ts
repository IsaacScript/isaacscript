/**
 * Helper type to ensure that an object contains a key for every enum member. Use this with `as
 * const` and `satisfies` to prevent narrowing the type of the object.
 *
 * For example:
 *
 * ```ts
 * enum MyEnum {
 *   Value1,
 *   Value2,
 *   Value3,
 * }
 *
 * const MyEnumToString = {
 *   [MyEnum.Value1]: "foo",
 *   [MyEnum.Value2]: "bar",
 *   [MyEnum.Value3]: "baz",
 * } as const satisfies HasAllEnumKeys<MyEnum>;
 *
 * const value = MyEnumToString[MyEnum.Value2];
 * ```
 */
export type HasAllEnumKeys<Enum extends string | number, T> = {
  readonly [key in Enum]: T;
};
