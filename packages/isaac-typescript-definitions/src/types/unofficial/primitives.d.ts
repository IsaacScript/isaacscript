// The Binding of Isaac: Rebirth Lua API expects certain values as either integers or floats, so we
// define those types here

/**
 * In TypeScript (and Lua), `number` is the same thing as `int`. We make an alias here so that the
 * API definitions better correspond to the official API documentation.
 *
 * To avoid verbose casting everywhere, we make `int` an alias for `number` (instead of branding
 * it).
 */
// We intersect with an empty object to prevent VSCode from replacing `int` with `number` on
// mouseover.
// eslint-disable-next-line @typescript-eslint/naming-convention
declare type int = number & {};

/**
 * In TypeScript (and Lua), `number` is the same thing as `float`. We make an alias here so that the
 * API definitions better correspond to the official API documentation.
 *
 * To avoid verbose casting everywhere, we make `float` an alias for `number` (instead of branding
 * it).
 */
// We intersect with an empty object to prevent VSCode from replacing `float` with `number` on
// mouseover.
// eslint-disable-next-line @typescript-eslint/naming-convention
declare type float = number & {};
