type FirstArg<K, V> = Iterable<[K, V]> | V | ((k: K) => V);
type SecondArg<K, V> = V | ((k: K) => V);

interface ParsedArgs<K, V> {
  iterable: Iterable<[K, V]> | undefined;
  defaultValue: V | undefined;
  defaultValueFactory: ((k: K) => V) | undefined;
}

/**
 * An extended Map with a new method of `getAndSetDefault`.
 *
 * When instantiating the object, you must specify either a default value or a function that returns
 * a default value.
 *
 * Example:
 * ```ts
 * const defaultMap1 = new DefaultMap<string, string>("foo");
 * const defaultMap2 = new DefaultMap<string, string>(["a", "b", "c"], "bar");
 * ```
 */
export class DefaultMap<K, V> extends Map<K, V> {
  private defaultValue: V | undefined;
  private defaultValueFactory: ((k: K) => V) | undefined;

  /**
   * See the DefaultMap documentation:
   * https://isaacscript.github.io/isaacscript-common/classes/types_DefaultMap.DefaultMap.html
   */
  constructor(
    iterableOrDefaultValueOrDefaultValueFactory: FirstArg<K, V>,
    defaultValueOrDefaultValueFactory?: SecondArg<K, V>,
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
   * Almost the same as `Map.prototype.get`. However, if the key does not exist in the map, then
   * this method will set the default value for the key and return the default value.
   */
  getAndSetDefault(key: K) {
    if (this.has(key)) {
      return this.get(key);
    }

    const defaultValue = this.getDefaultValue(key);
    this.set(key, defaultValue);
    return defaultValue;
  }

  getDefaultValue(key: K) {
    if (this.defaultValue !== undefined) {
      return this.defaultValue;
    }

    if (this.defaultValueFactory !== undefined) {
      return this.defaultValueFactory(key);
    }

    return error("A DefaultMap was incorrectly instantiated.");
  }
}

function parseArguments<K, V>(
  firstArg: FirstArg<K, V>,
  secondArg?: SecondArg<K, V>,
): ParsedArgs<K, V> {
  return secondArg === undefined
    ? parseArgumentsOne(firstArg)
    : parseArgumentsTwo(firstArg, secondArg);
}

function parseArgumentsOne<K, V>(firstArg: FirstArg<K, V>): ParsedArgs<K, V> {
  const { defaultValue, defaultValueFactory } =
    parseDefaultValueOrDefaultValueFactory(firstArg as SecondArg<K, V>);
  return {
    iterable: undefined,
    defaultValue,
    defaultValueFactory,
  };
}

function parseArgumentsTwo<K, V>(
  firstArg: FirstArg<K, V>,
  secondArg: SecondArg<K, V>,
): ParsedArgs<K, V> {
  const firstArgType = type(firstArg);
  if (firstArgType !== "table") {
    error(
      "A DefaultMap constructor with two arguments must have the first argument be an array.",
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

function parseDefaultValueOrDefaultValueFactory<K, V>(
  arg: SecondArg<K, V>,
): {
  defaultValue: V | undefined;
  defaultValueFactory: ((k: K) => V) | undefined;
} {
  const argType = type(arg);

  if (argType === "function") {
    return {
      defaultValue: undefined,
      defaultValueFactory: arg as (k: K) => V,
    };
  }

  if (argType === "boolean" || argType === "number" || argType === "string") {
    return {
      defaultValue: arg as V,
      defaultValueFactory: undefined,
    };
  }

  return error(
    `A DefaultMap was instantiated with an unknown type of: ${argType}`,
  );
}
