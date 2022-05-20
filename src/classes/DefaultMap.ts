type FactoryFunction<V, Args extends unknown[]> = (...extraArgs: Args) => V;
type FirstArg<K, V, Args extends unknown[]> =
  | Iterable<[K, V]>
  | V
  | FactoryFunction<V, Args>;
type SecondArg<V, Args extends unknown[]> = V | FactoryFunction<V, Args>;

interface ParsedArgs<K, V, Args extends unknown[]> {
  iterable: Iterable<[K, V]> | undefined;
  defaultValue: V | undefined;
  defaultValueFactory: FactoryFunction<V, Args> | undefined;
}

/**
 * An extended Map with some new methods:
 *
 * - `getAndSetDefault` - If the key exists, this will return the same thing as the `get` method.
 *   Otherwise, it will set a default value to the key, and then return the default value.
 * - `getDefaultValue` - Returns the default value to be used for a new key. (If a factory function
 *   was provided during instantiation, this will execute the factory function.)
 * - `getConstructorArg` - Helper method for cloning the map. Returns either the default value or
 *   the reference to the factory function.
 *
 * When instantiating a new DefaultMap, you must specify either a default value or a function that
 * returns a default value.
 *
 * For example:
 *
 * ```ts
 * // Initializes a new empty DefaultMap with a default value of "foo"
 * const defaultMapWithPrimitive = new DefaultMap<string, string>("foo");
 *
 * // Initializes a new empty DefaultMap with a default value of a new Map
 * const defaultMapWithFactory = new DefaultMap<string, Map<string, string>>(() => {
 *   return new Map();
 * })
 *
 * // Initializes a DefaultMap with some initial values and a default value of "bar"
 * const defaultMapWithInitialValues = new DefaultMap<string, string>([
 *   ["a1", "a2"],
 *   ["b1", "b2"],
 * ], "bar");
 * ```
 *
 * If specified, the first argument of a factory function must always be equal to the key:
 *
 * ```ts
 * const defaultMapWithConditionalDefaultValue = new DefaultMap<number, number>((key: number) => {
 *   return isOdd(key) ? 0 : 1;
 * });
 * ```
 *
 * You can also specify a factory function that takes a generic amount of arguments beyond the
 * first:
 *
 * ```ts
 * const factoryFunction = (arg: boolean) => arg ? 0 : 1;
 * const defaultMapWithExtraArgs = new DefaultMap<string, string, [arg: boolean]>(factoryFunction);
 * ```
 */
export class DefaultMap<K, V, Args extends unknown[] = []> extends Map<K, V> {
  private defaultValue: V | undefined;
  private defaultValueFactory: FactoryFunction<V, Args> | undefined;

  /**
   * See the DefaultMap documentation:
   * https://isaacscript.github.io/isaacscript-common/classes/types_DefaultMap.DefaultMap.html
   */
  constructor(
    iterableOrDefaultValueOrDefaultValueFactory: FirstArg<K, V, Args>,
    defaultValueOrDefaultValueFactory?: SecondArg<V, Args>,
  ) {
    const { iterable, defaultValue, defaultValueFactory } = parseArguments(
      iterableOrDefaultValueOrDefaultValueFactory,
      defaultValueOrDefaultValueFactory,
    );

    if (defaultValue === undefined && defaultValueFactory === undefined) {
      error(
        "A DefaultMap must be instantiated with either a default value or a function that returns a default value.",
      );
    }

    if (iterable === undefined) {
      super();
    } else {
      super(iterable);
    }

    this.defaultValue = defaultValue;
    this.defaultValueFactory = defaultValueFactory;
  }

  /**
   * If the key exists, this will return the same thing as the `get` method. Otherwise, it will set
   * a default value to the key, and then return the default value.
   */
  getAndSetDefault(key: K, ...extraArgs: Args): V {
    const value = this.get(key);
    if (value !== undefined) {
      return value;
    }

    const defaultValue = this.getDefaultValue(...extraArgs);
    this.set(key, defaultValue);
    return defaultValue;
  }

  /**
   * Returns the default value to be used for a new key. (If a factory function was provided during
   * instantiation, this will execute the factory function.)
   */
  getDefaultValue(...extraArgs: Args): V {
    if (this.defaultValue !== undefined) {
      return this.defaultValue;
    }

    if (this.defaultValueFactory !== undefined) {
      return this.defaultValueFactory(...extraArgs);
    }

    return error("A DefaultMap was incorrectly instantiated.");
  }

  /**
   * Helper method for cloning the map. Returns either the default value or a reference to the
   * factory function.
   */
  getConstructorArg(): V | FactoryFunction<V, Args> {
    if (this.defaultValue !== undefined) {
      return this.defaultValue;
    }

    if (this.defaultValueFactory !== undefined) {
      return this.defaultValueFactory;
    }

    return error("A DefaultMap was incorrectly instantiated.");
  }
}

function parseArguments<K, V, Args extends unknown[]>(
  firstArg: FirstArg<K, V, Args>,
  secondArg?: SecondArg<V, Args>,
): ParsedArgs<K, V, Args> {
  return secondArg === undefined
    ? parseArgumentsOne(firstArg)
    : parseArgumentsTwo(firstArg, secondArg);
}

function parseArgumentsOne<K, V, Args extends unknown[]>(
  firstArg: FirstArg<K, V, Args>,
): ParsedArgs<K, V, Args> {
  const arg = firstArg as SecondArg<V, Args>;
  const { defaultValue, defaultValueFactory } =
    parseDefaultValueOrDefaultValueFactory(arg);
  return {
    iterable: undefined,
    defaultValue,
    defaultValueFactory,
  };
}

function parseArgumentsTwo<K, V, Args extends unknown[]>(
  firstArg: FirstArg<K, V, Args>,
  secondArg: SecondArg<V, Args>,
): ParsedArgs<K, V, Args> {
  const firstArgType = type(firstArg);
  if (firstArgType !== "table") {
    error(
      "A DefaultMap constructor with two arguments must have the first argument be the initializer list.",
    );
  }

  const { defaultValue, defaultValueFactory } =
    parseDefaultValueOrDefaultValueFactory(secondArg);
  return {
    iterable: firstArg as Iterable<[K, V]>,
    defaultValue,
    defaultValueFactory,
  };
}

function parseDefaultValueOrDefaultValueFactory<V, Args extends unknown[]>(
  arg: SecondArg<V, Args>,
): {
  defaultValue: V | undefined;
  defaultValueFactory: FactoryFunction<V, Args> | undefined;
} {
  if (typeof arg === "function") {
    return {
      defaultValue: undefined,
      defaultValueFactory: arg as FactoryFunction<V, Args>,
    };
  }

  if (
    typeof arg === "boolean" ||
    typeof arg === "number" ||
    typeof arg === "string"
  ) {
    return {
      defaultValue: arg as V,
      defaultValueFactory: undefined,
    };
  }

  return error(
    `A DefaultMap was instantiated with an unknown type of: ${typeof arg}`,
  );
}
