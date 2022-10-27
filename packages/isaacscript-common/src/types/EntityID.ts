/**
 * A string that represents an entity. This is the entity type, variant, and sub-type, all separated
 * by periods.
 *
 * This type is branded for extra type safety.
 */
export type EntityID = string & { readonly __entityIDBrand: symbol };
