/**
 * This is the format of the object that you give to the save data manager. It will contains all of
 * the variables for the particular mod feature.
 *
 * Depending on which object keys you use, the variables will be automatically reset at certain
 * times and automatically saved to disk.
 *
 * Each sub-object of save data has a string as a key and arbitrary data as a value. However, the
 * data has to be serializable. Specifically, this means that you can only use the following types:
 *
 * - `boolean`
 * - `number`
 * - `string`
 * - `Map` / `DefaultMap`
 * - `Set`
 * - serializable Isaac API classes (such as `Color`)
 * - TSTL classes (i.e. classes that you made yourself)
 * - sub-objects or a `LuaTable` that contains the above values
 *
 * (Unfortunately, it is not possible to create a recursive type definition that matches these
 * properties. This means that the TypeScript compiler will not be able to validate that you are
 * passing in serializable data.)
 */
export interface SaveData {
  persistent?: SaveDataGroup;
  run?: SaveDataGroup;
  level?: SaveDataGroup;
  room?: SaveDataGroup;
}

export type SaveDataGroup = Record<string, unknown>;
