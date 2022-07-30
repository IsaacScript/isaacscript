import { AnyClass } from "../types";

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
 * - `undefined` (will be skipped over when saving)
 * - `null` (will be skipped over when saving)
 * - `Map` / `DefaultMap`
 * - `Set`
 * - serializable Isaac API classes (such as `Color`)
 * - TSTL classes (i.e. classes that you made yourself)
 * - sub-objects or a `LuaMap` that contains the above values
 *
 * (Unfortunately, it is not possible to create a recursive type definition that matches these
 * properties. This means that the TypeScript compiler will not be able to validate that you are
 * passing in serializable data.)
 */
export interface SaveData<
  Persistent = unknown,
  Run = unknown,
  Level = unknown,
> {
  persistent?: Serializable<Persistent>;
  run?: Serializable<Run>;
  level?: Serializable<Level>;
  room?: Record<string, unknown>; // Room data is never saved to disk.
}

/**
 * A type that represents valid serializable data fed to the save data manager.
 *
 * Custom errors are thrown when an Isaac API class or a nested custom class is detected.
 *
 * The recursive nature of this type is based on the `Immutable` type:
 * https://stackoverflow.com/questions/41879327/deepreadonly-object-typescript
 */
type Serializable<T> = T extends SerializableIsaacAPIClass
  ? T
  : T extends IsaacAPIClass
  ? ErrorIsaacAPIClassIsNotSerializable
  : T extends SerializablePrimitive
  ? T
  : T extends Array<infer U>
  ? SerializableArray<U>
  : T extends Map<infer K, infer V>
  ? SerializableMap<K, V>
  : T extends Set<infer M>
  ? SerializableSet<M>
  : SerializableObject<T>;

type SerializableInsideArrayOrMap<T> = T extends AnyClass
  ? ErrorCustomClassIsNotSerializable
  : Serializable<T>;

type SerializablePrimitive = boolean | string | number | undefined | null;
type SerializableArray<T> = Array<SerializableInsideArrayOrMap<T>>;
type SerializableMap<K, V> = Map<
  SerializableInsideArrayOrMap<K>,
  SerializableInsideArrayOrMap<V>
>;
type SerializableSet<T> = Set<SerializableInsideArrayOrMap<T>>;
type SerializableObject<T> = { [K in keyof T]: Serializable<T[K]> };
type SerializableIsaacAPIClass = Color | KColor | RNG | Vector;

type ErrorIsaacAPIClassIsNotSerializable =
  "Error: Isaac API classes (such as e.g. `Entity` or `RoomConfig`) are not serializable. For more information, see: https://isaacscript.github.io/main/gotchas#isaac-api-classes-are-not-serializable";

type ErrorCustomClassIsNotSerializable =
  'Error: The "DefaultMap" class and other custom classes are not serializable when they are placed inside of an array, map, or set. For more information, see: https://isaacscript.github.io/main/gotchas#defaultmap-and-other-custom-classes-are-not-serializable';
