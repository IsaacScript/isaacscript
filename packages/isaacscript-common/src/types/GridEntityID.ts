/**
 * A string that represents a grid entity. This is the entity type and variant separated by a
 * period.
 *
 * This type is branded for extra type safety.
 */
export type GridEntityID = string & { readonly __gridEntityIDBrand: symbol };
