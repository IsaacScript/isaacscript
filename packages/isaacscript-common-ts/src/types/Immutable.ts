/**
 * Immutable is a utility type that will make the given array/map/set/object recursively read-only.
 *
 * You can use this type to easily build safe data structures.
 *
 * From: https://stackoverflow.com/questions/41879327/deepreadonly-object-typescript
 */
export type Immutable<T> = T extends ImmutablePrimitive
  ? T
  : T extends Array<infer U>
    ? ImmutableArray<U>
    : T extends Map<infer K, infer V>
      ? ImmutableMap<K, V>
      : T extends Set<infer M>
        ? ImmutableSet<M>
        : ImmutableObject<T>;

type ImmutablePrimitive =
  | undefined
  | null
  | boolean
  | string
  | number
  | Function; // eslint-disable-line @typescript-eslint/ban-types
type ImmutableArray<T> = ReadonlyArray<Immutable<T>>;
type ImmutableMap<K, V> = ReadonlyMap<Immutable<K>, Immutable<V>>;
type ImmutableSet<T> = ReadonlySet<Immutable<T>>;
type ImmutableObject<T> = { readonly [K in keyof T]: Immutable<T[K]> };
