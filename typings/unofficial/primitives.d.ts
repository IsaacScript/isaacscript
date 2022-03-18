// The Binding of Isaac: Rebirth Lua API expects certain values as either integers or floats,
// so we define those types here

/**
 * TypeScript does not support integers.
 * https://spin.atomicobject.com/2018/11/05/using-an-int-type-in-typescript/
 * To avoid verbose casting everywhere, we just make int an alias for number.
 */
type int = number; // eslint-disable-line @typescript-eslint/naming-convention

/**
 * In TypeScript, a "number" is the same thing as a float. We make an alias here so that the API
 * definitions better correspond to the official API documentation.
 */
type float = number; // eslint-disable-line @typescript-eslint/naming-convention
