import { Primitive } from "../Primitive";

/**
 * I don't know how to create a recursive type definition for only primitive values. For now, this
 * is typed as "unknown", which provides no type safety.
 */
type Serializable = Primitive | unknown;

/**
 * Each sub-object of save data has a string as a key, without arbitrary data as a value. However,
 * the data has to be serializable (i.e. no `userdata` objects).
 */
type SaveDataGroup = Record<string, Serializable>;

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
