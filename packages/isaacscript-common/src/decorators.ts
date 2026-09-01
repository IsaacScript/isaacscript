import type { Feature } from "./classes/private/Feature";
import { getTSTLClassName } from "./functions/tstlClass";

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
  const constructor = target.constructor as unknown as
    | Record<string, unknown>
    | undefined;

  if (constructor === undefined) {
    const tstlClassName = getTSTLClassName(target) ?? "Unknown";
    error(
      `Failed to get the constructor for class "${tstlClassName}". Did you decorate a static method? You can only decorate non-static class methods.`,
    );
  }

  let exportedMethodNames = constructor[EXPORTED_METHOD_NAMES_KEY] as
    | unknown[]
    | undefined;
  if (exportedMethodNames === undefined) {
    exportedMethodNames = [];
    constructor[EXPORTED_METHOD_NAMES_KEY] = exportedMethodNames;
  }

  exportedMethodNames.push(propertyKey as string);
}
