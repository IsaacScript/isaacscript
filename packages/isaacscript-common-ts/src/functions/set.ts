/**
 * Helper function to add one or more elements to a set at once without having to repeatedly call
 * the `Set.add` method.
 *
 * This function is variadic, meaning that you can pass as many things as you want to add.
 */
export function setAdd<T>(set: Set<T>, ...elements: T[]): void {
  for (const element of elements) {
    set.add(element);
  }
}
