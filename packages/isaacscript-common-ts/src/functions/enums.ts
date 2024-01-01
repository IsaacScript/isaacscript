type TranspiledEnum = Record<string, string | number>;

/**
 * Helper function to get the entries of an enum.
 *
 * (By default, TypeScript will put the keys inside of the values of a number-based enum, so those
 * have to be filtered out.)
 *
 * This function will work properly for both number and string enums.
 */
export function getEnumEntries<T extends TranspiledEnum>(
  transpiledEnum: T,
): ReadonlyArray<[key: string, value: T[keyof T]]> {
  const entries = Object.entries(transpiledEnum);
  const numberEntries = entries.filter(
    ([_key, value]) => typeof value === "number",
  );

  // If there are no number values, then this must be a string enum, and no filtration is required.
  const entriesToReturn = numberEntries.length > 0 ? numberEntries : entries;
  return entriesToReturn as never;
}

/**
 * Helper function to get the keys of an enum.
 *
 * (By default, TypeScript will put the keys inside of the values of a number-based enum, so those
 * have to be filtered out.)
 *
 * This function will work properly for both number and string enums.
 */
export function getEnumKeys(transpiledEnum: TranspiledEnum): readonly string[] {
  const enumEntries = getEnumEntries(transpiledEnum);
  return enumEntries.map(([key, _value]) => key);
}

/**
 * Helper function to get the only the values of an enum.
 *
 * (By default, TypeScript will put the keys inside of the values of a number-based enum, so those
 * have to be filtered out.)
 *
 * This function will work properly for both number and string enums.
 */
export function getEnumValues<T extends TranspiledEnum>(
  transpiledEnum: T,
): ReadonlyArray<T[keyof T]> {
  const enumEntries = getEnumEntries(transpiledEnum);
  return enumEntries.map(([_key, value]) => value);
}

/**
 * Helper function to validate that a particular value exists inside of an enum.
 *
 * @param value The value to check.
 * @param transpiledEnum The enum to check against.
 * @param set Optional. A set that contains all of the values of an enum. If provided, this function
 *            will for existence using the set (instead of the enum itself). Using a set should be
 *            more performant for enums with around 52 or more elements.
 */
export function isEnumValue<T extends TranspiledEnum>(
  value: number | string,
  transpiledEnum: T,
  set?: ReadonlySet<string | number>,
): value is T[keyof T] {
  if (set !== undefined) {
    return set.has(value);
  }

  const enumValues = getEnumValues(transpiledEnum);
  return enumValues.includes(value as T[keyof T]);
}

/**
 * Helper function to validate that an interface contains all of the keys of an enum. You must
 * specify both generic parameters in order for this to work properly (i.e. the interface and then
 * the enum).
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
 * interface MyEnumToType {
 *   [MyEnum.Value1]: boolean;
 *   [MyEnum.Value2]: number;
 *   [MyEnum.Value3]: string;
 * }
 *
 * validateInterfaceMatchesEnum<MyEnumToType, MyEnum>();
 * ```
 *
 * This function is only meant to be used with interfaces (i.e. types that will not exist at
 * run-time). If you are generating an object that will contain all of the keys of an enum, use the
 * `satisfies` operator with the `Record` type instead.
 */
export function validateInterfaceMatchesEnum<
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  T extends Record<Enum, unknown>,
  Enum extends string | number,
>(): void {} // eslint-disable-line @typescript-eslint/no-empty-function
