/**
 * This represents a composition of 0 or more bit flags.
 *
 * This type must be branded so that the compiler can differentiate between a variable that is
 * guaranteed to contain exactly one bit flag and a variable that has two or more bit flags (or zero
 * bit flags).
 */
declare type BitFlags<T extends BitFlag | BitFlag128> = T & {
  readonly __bitFlagsBrand: T;
};
