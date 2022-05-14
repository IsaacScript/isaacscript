/**
 * A helper type for creating objects that emulate enums.
 *
 * For example:
 *
 * ```ts
 * export type TearFlag = MakeEnumExportedType<TearFlagType>
 * ```
 */
type MakeEnumExportedType<T> = T[keyof T];
