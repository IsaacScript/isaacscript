import { Feature } from "./classes/private/Feature";

/**
 * A decorator function that signifies that the decorated class method should be added to the
 * `ModUpgraded` object.
 *
 * This is only meant to be used internally.
 */
export function Exported() {
  return <T extends Feature>(_target: T, _propertyKey: keyof T): void => {
    // target.exportedMethods.push(propertyKey as string);
  };
}
