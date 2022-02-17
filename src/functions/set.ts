/**
 * Helper function to add all of the contents of one set to another set. The first set passed will
 * be modified in place.
 *
 * This function is variadic, meaning that you can specify N sets to add to the first set.
 */
export function addSetsToSet<T>(mainSet: Set<T>, ...setsToAdd: Array<Set<T>>) {
  for (const set of setsToAdd) {
    for (const value of set.values()) {
      mainSet.add(value);
    }
  }
}

/**
 * Using a Set constructor to copy a Set does not seem to work properly, so use this helper function
 * instead.
 */
export function copySet<T>(oldSet: Set<T>): Set<T> {
  const newSet = new Set<T>();
  for (const value of oldSet.values()) {
    newSet.add(value);
  }

  return newSet;
}

/**
 * Helper function to create a new set that is the composition of two or more sets.
 *
 * This function is variadic, meaning that you can specify N sets.
 */
export function combineSets<T>(...sets: Array<Set<T>>): Set<T> {
  const newSet = new Set<T>();
  for (const set of sets) {
    for (const value of set.values()) {
      newSet.add(value);
    }
  }

  return newSet;
}
