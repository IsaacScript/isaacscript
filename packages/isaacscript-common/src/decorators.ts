import type { Feature } from "./classes/private/Feature";

export const EXPORTED_METHOD_NAMES_KEY = "__exportedMethodNames";

/**
 * A decorator function that signifies that the decorated class method should be added to the
 * `ModUpgraded` object.
 *
 * This is only meant to be used internally.
 */
export function Exported<Class extends Feature>(
  target: Class,
  propertyKey: keyof Class,
): void {
  // Since the decorator runs prior to instantiation, we only have access to get and set static
  // properties, which are located on the "constructor" table.
  const constructor = target.constructor as unknown as LuaMap<
    AnyNotNil,
    unknown
  >;
  if (!constructor.has(EXPORTED_METHOD_NAMES_KEY)) {
    constructor.set(EXPORTED_METHOD_NAMES_KEY, []);
  }

  const exportedMethodNames = constructor.get(
    EXPORTED_METHOD_NAMES_KEY,
  ) as string[];
  exportedMethodNames.push(propertyKey as string);
}
