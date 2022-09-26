import { Feature } from "./classes/private/Feature";

/**
 * A decorator function that signifies that the decorated method should be added to the
 * `ModUpgraded` object.
 */
export function Exported() {
  return <T extends Feature>(target: T, propertyKey: keyof T): void => {
    target.exportedMethods.push(propertyKey as string);
  };
}
