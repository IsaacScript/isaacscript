import { isFunction, isPrimitive } from "../functions/types";

/**
 * `DefaultMap` is a data structure that makes working with default values easier. It extends a
 * `Map` and adds additional methods.
 *
 * It is a common pattern to look up a value in a `Map`, and then, if the value does not exist, set
 * a default value for the key, and then return the default value. `DefaultMap` abstracts this
 * operation away by providing the `getAndSetDefault` method.
 *
 * Using a `DefaultMap` is nice because it makes code more declarative, since you specify what the
 * default value is alongside the types of the keys/values.
 *
 * When instantiating a new `DefaultMap`, you must specify default value as the first argument. (The
 * default value is the initial value that will be assigned to every new entry in the
 * `getAndSetDefault` method.) For example:
 *
 * ```ts
 * // Initializes a new empty DefaultMap with a default value of "foo".
 * const defaultMapWithString = new DefaultMap<string, string>("foo");
 *
 * const value = defaultMapWithString.getAndSetDefault("bar");
 * // value is now "foo" and an entry for "bar" is now set.
 * ```
 *
 * Sometimes, instead of having a static initial value for every entry in the map, you will want a
 * dynamic initial value that is contingent upon the key or some other variable. In these cases, you
 * can instead specify that the `DefaultMap` should run a function that will return the initial
 * value. (This is referred to as a "factory function".) For example:
 *
 * ```ts
 * // Initializes a new empty DefaultMap with a default value based on "someGlobalVariable".
 * const factoryFunction = () => someGlobalVariable ? 0 : 1;
 * const defaultMapWithFactoryFunction = new DefaultMap<string, string>(factoryFunction);
 * ```
 *
 * Note that in TypeScript and Lua, booleans, numbers, and strings are "passed by value". This means
 * that when the `DefaultMap` creates a new entry, if the default value is one of these 3 types, the
 * values will be copied. On the other hand, arrays and maps and other complex data structures are
 * "passed by reference". This means that when the `DefaultMap` creates a new entry, if the default
 * value is an array, then it would not be copied. Instead, the same shared array would be assigned
 * to every entry. Thus, to solve this problem, any variable that is passed by reference must be
 * created using a factory function to ensure that each copy is unique. For example:
 *
 * ```ts
 * // Initializes a new empty DefaultMap with a default value of a new empty array.
 * const factoryFunction = () => [];
 * const defaultMapWithArray = new DefaultMap<string, string[]>(factoryFunction);
 * ```
 *
 * In the previous two examples, the factory functions did not have any arguments. But you can also
 * specify a factory function that takes one or more arguments:
 *
 * ```ts
 * const factoryFunction = (arg: boolean) => arg ? 0 : 1;
 * const defaultMapWithArg = new DefaultMap<string, string, [arg: boolean]>(factoryFunction);
 * ```
 *
 * Similar to a normal `Map`, you can also include an initializer list in the constructor as the
 * second argument:
 *
 * ```ts
 * // Initializes a DefaultMap with a default value of "foo" and some initial values.
 * const defaultMapWithInitialValues = new DefaultMap<string, string>("foo", [
 *   ["a1", "a2"],
 *   ["b1", "b2"],
 * ], );
 * ```
 *
 * Finally, note that `DefaultMap` has the following additional utility methods:
 *
 * - `getAndSetDefault` - The method that is called inside the overridden `get` method. In most
 *   cases, you can use the overridden `get` method instead of calling this function directly.
 *   However, if a factory function was provided during instantiation, and the factory function has
 *   one or more arguments, then you must call this method instead (and provide the corresponding
 *   arguments).
 * - `getDefaultValue` - Returns the default value to be used for a new key. (If a factory function
 *   was provided during instantiation, this will execute the factory function.)
 * - `getConstructorArg` - Helper method for cloning the map. Returns either the default value or
 *   the reference to the factory function.
 */
export class DefaultMap<Key, Value, Args extends unknown[] = []> extends Map<
  Key,
  Value
> {
  private readonly defaultValue: Value | undefined;
  private readonly defaultValueFactory:
    | FactoryFunction<Value, Args>
    | undefined;

  /**
   * See the main `DefaultMap` documentation:
   * https://isaacscript.github.io/isaacscript-common/other/classes/DefaultMap
   */
  constructor(
    defaultValueOrFactoryFunction: Value | FactoryFunction<Value, Args>,
    initializerArray?: Iterable<[Key, Value]>,
  ) {
    const argIsPrimitive = isPrimitive(defaultValueOrFactoryFunction);
    const argIsFunction = isFunction(defaultValueOrFactoryFunction);
    if (!argIsPrimitive && !argIsFunction) {
      error(
        `Failed to instantiate a DefaultMap since the provided default value was of type "${typeof defaultValueOrFactoryFunction}". This error usually means that you are trying to use an array (or some other non-primitive data structure that is passed by reference) as the default value. Instead, return the data structure in a factory function, like "() => []". See the DefaultMap documentation for more details.`,
      );
    }

    super(initializerArray);

    if (argIsFunction) {
      this.defaultValue = undefined;
      this.defaultValueFactory = defaultValueOrFactoryFunction;
    } else {
      this.defaultValue = defaultValueOrFactoryFunction;
      this.defaultValueFactory = undefined;
    }
  }

  /**
   * If the key exists, this will return the same thing as the normal `Map.get` method. Otherwise,
   * it will set a default value for the provided key, and then return the default value.
   *
   * @allowEmptyVariadic
   */
  public getAndSetDefault(key: Key, ...args: Args): Value {
    const value = super.get(key);
    if (value !== undefined) {
      return value;
    }

    const defaultValue = this.getDefaultValue(...args);
    this.set(key, defaultValue);
    return defaultValue;
  }

  /**
   * Returns the default value to be used for a new key. (If a factory function was provided during
   * instantiation, this will execute the factory function.)
   */
  public getDefaultValue(...args: Args): Value {
    if (this.defaultValue !== undefined) {
      return this.defaultValue;
    }

    if (this.defaultValueFactory !== undefined) {
      return this.defaultValueFactory(...args);
    }

    error("A DefaultMap was incorrectly instantiated.");
  }

  /**
   * Helper method for cloning the map. Returns either the default value or a reference to the
   * factory function.
   */
  public getConstructorArg(): Value | FactoryFunction<Value, Args> {
    if (this.defaultValue !== undefined) {
      return this.defaultValue;
    }

    if (this.defaultValueFactory !== undefined) {
      return this.defaultValueFactory;
    }

    error("A DefaultMap was incorrectly instantiated.");
  }
}

/**
 * A function that creates the default value for your `DefaultMap`. For example, if it was a
 * `DefaultMap` containing maps, the factory function would be:
 *
 * ```ts
 * () => new Map()
 * ```
 */
export type FactoryFunction<V, Args extends unknown[]> = (...args: Args) => V;

/* eslint-disable @typescript-eslint/no-unused-vars */
function test() {
  // Boolean
  const myDefaultMapBoolean = new DefaultMap<string, boolean>(false);
  const myDefaultMapBooleanFactory = new DefaultMap<string, boolean>(
    () => false,
  );
  const myDefaultMapBooleanWithoutParams = new DefaultMap(false);

  // Number
  const myDefaultMapNumber = new DefaultMap<string, number>(123);
  const myDefaultMapNumberFactory = new DefaultMap<string, number>(() => 123);
  const myDefaultMapNumberWithoutParams = new DefaultMap(123);

  // String
  const myDefaultMapString = new DefaultMap<string, string>("foo");
  const myDefaultMapStringFactory = new DefaultMap<string, string>(() => "foo");
  const myDefaultMapStringWithoutParams = new DefaultMap("foo");

  // Array
  const myDefaultMapArray = new DefaultMap<string, string[]>(() => []);
  const myDefaultMapArrayWithoutParams = new DefaultMap(() => []);

  // Map
  const myDefaultMapMap = new DefaultMap<string, Map<string, string>>(
    () => new Map(),
  );
  const myDefaultMapMapWithoutParams = new DefaultMap(() => new Map());
}
/* eslint-enable @typescript-eslint/no-unused-vars */
