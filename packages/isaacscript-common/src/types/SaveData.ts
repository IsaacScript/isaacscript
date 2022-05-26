/* eslint-disable sort-exports/sort-exports */

/**
 * Each sub-object of save data has a string as a key, without arbitrary data as a value. However,
 * the data has to be serializable (i.e. no `userdata` objects).
 *
 * The values of the save data group can only be:
 * - `boolean`
 * - `number`
 * - `string`
 * - `Map` / `DefaultMap`
 * - `Set`
 * - a TSTL class
 * - serializable Isaac API classes (such as `Color`)
 * - a sub-object or `LuaTable` that contains the above values
 *
 * It is not possible to create a recursive type definition that matches these properties, so this
 * is typed as "unknown", which provides no type safety.
 */
export type SaveDataGroup = Record<string, unknown>;

/**
 * The object that contains all of the variables that will be managed by the save data manager.
 * Depending on which property is used, the variables will be reset at certain times.
 */
export interface SaveData {
  persistent?: SaveDataGroup;
  run?: SaveDataGroup;
  level?: SaveDataGroup;
  room?: SaveDataGroup;
}
