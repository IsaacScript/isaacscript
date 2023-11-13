/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable max-classes-per-file */

import type { CopyableIsaacAPIClass } from "../objects/isaacAPIClassTypeToFunctions";

/**
 * This is the format of the object that you give to the save data manager. It will contains all of
 * the variables for the particular mod feature.
 *
 * Depending on which object keys you use, the variables will automatically be reset at certain
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
type Serializable<T> =
  // Allow the trivial case of primitives.
  T extends SerializablePrimitive
    ? T
    : // Allow a specific subset of Isaac API classes that are copyable / serializable.
      T extends CopyableIsaacAPIClass
      ? T
      : // Disallow all other Isaac API classes.
        T extends IsaacAPIClass
        ? ErrorIsaacAPIClassIsNotSerializable
        : // Allow some specific "container" objects.
          // These container objects are explicitly handled by the save data manager, but there are
          // restrictions on the things inside of them.
          T extends Array<infer U>
          ? SerializableArray<U>
          : T extends ReadonlyArray<infer U>
            ? SerializableReadonlyArray<U>
            : T extends Map<infer K, infer V>
              ? SerializableMap<K, V>
              : T extends ReadonlyMap<infer K, infer V>
                ? SerializableReadonlyMap<K, V>
                : T extends Set<infer V>
                  ? SerializableSet<V>
                  : T extends ReadonlySet<infer V>
                    ? SerializableReadonlySet<V>
                    : // Allow any other object, as long as the values are themselves serializable.
                      SerializableObject<T>;

/**
 * This is mostly copied from the `Serializable` type. The difference is that we want to disallow
 * functions inside of containers.
 */
type SerializableInsideArrayOrMap<T> =
  // Allow the trivial case of primitives.
  T extends SerializablePrimitive
    ? T
    : // Allow a specific subset of Isaac API classes that are copyable / serializable.
      T extends CopyableIsaacAPIClass
      ? T
      : // Disallow all other Isaac API classes.
        T extends IsaacAPIClass
        ? ErrorIsaacAPIClassIsNotSerializable
        : // Allow some specific "container" objects.
          // These container objects are explicitly handled by the save data manager, but there are
          // restrictions on the things inside of them.
          T extends Array<infer U>
          ? SerializableArray<U>
          : T extends ReadonlyArray<infer U>
            ? SerializableReadonlyArray<U>
            : T extends Map<infer K, infer V>
              ? SerializableMap<K, V>
              : T extends ReadonlyMap<infer K, infer V>
                ? SerializableReadonlyMap<K, V>
                : T extends Set<infer V>
                  ? SerializableSet<V>
                  : T extends ReadonlySet<infer V>
                    ? SerializableReadonlySet<V>
                    : // Disallow functions.
                      // (We can only disallow functions when inside of containers, because we want to allow classes
                      // with methods attached to normal objects.)
                      T extends Function // eslint-disable-line @typescript-eslint/ban-types
                      ? FunctionIsNotSerializable
                      : // Allow any other object, as long as the values are themselves serializable.
                        SerializableObject<T>;

type SerializablePrimitive = boolean | string | number | undefined | null;
type SerializableArray<T> = Array<SerializableInsideArrayOrMap<T>>;
type SerializableReadonlyArray<T> = ReadonlyArray<
  SerializableInsideArrayOrMap<T>
>;
type SerializableMap<K, V> = Map<
  SerializableInsideArrayOrMap<K>,
  SerializableInsideArrayOrMap<V>
>;
type SerializableReadonlyMap<K, V> = ReadonlyMap<
  SerializableInsideArrayOrMap<K>,
  SerializableInsideArrayOrMap<V>
>;
type SerializableSet<T> = Set<SerializableInsideArrayOrMap<T>>;
type SerializableReadonlySet<T> = ReadonlySet<SerializableInsideArrayOrMap<T>>;
type SerializableObject<T> = { [K in keyof T]: Serializable<T[K]> };

type FunctionIsNotSerializable =
  "Error: Functions are not serializable. For more information, see: https://isaacscript.github.io/main/gotchas#functions-are-not-serializable";

type ErrorIsaacAPIClassIsNotSerializable =
  "Error: Isaac API classes (such as e.g. `Entity` or `RoomConfig`) are not serializable. For more information, see: https://isaacscript.github.io/main/gotchas#isaac-api-classes-are-not-serializable";

// -----
// Tests
// -----

function test<Persistent, Run, Level>(
  _saveData: SaveData<Persistent, Run, Level>,
) {}

{
  const saveDataWithPrimitives = {
    run: {
      foo: 123,
      bar: "bar",
      baz: true,
      nested: {
        foo: 123,
        bar: "bar",
        baz: true,
      },
    },
  };

  // Primitives and nested primitives are allowed.
  test(saveDataWithPrimitives);
}

{
  const saveDataWithEntity = {
    run: {
      foo: {} as Entity,
    },
  };

  // @ts-expect-error Isaac API classes are not serializable.
  test(saveDataWithEntity);
}

{
  const saveDataWithMap = {
    run: {
      foo: new Map<string, string>(),
    },
  };

  // Maps with primitive values are allowed.
  test(saveDataWithMap);
}

{
  const saveDataWithMap = {
    run: {
      foo: new Map<string, () => void>(),
    },
  };

  // @ts-expect-error Maps with function values are not serializable.
  test(saveDataWithMap);
}

{
  const saveDataWithMap = {
    run: {
      foo: new Map<string, Map<string, string>>(),
    },
  };

  // Nested maps are allowed.
  test(saveDataWithMap);
}

{
  class Foo {
    someField = 123;
  }

  const saveDataWithClass = {
    run: {
      foo: new Foo(),
    },
  };

  // Custom classes without methods are allowed.
  test(saveDataWithClass);
}

{
  class Foo {
    someField = 123;
    someMethod() {}
  }

  const saveDataWithClassWithMethod = {
    run: {
      foo: new Foo(),
    },
  };

  // Custom classes with methods are allowed.
  test(saveDataWithClassWithMethod);
}

{
  class Foo {
    someField = 123;
  }

  const saveDataWithNestedClass = {
    run: {
      fooMap: new Map<string, Foo>(),
    },
  };

  // Nested custom classes without methods are allowed.
  test(saveDataWithNestedClass);
}
