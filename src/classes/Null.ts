/* eslint-disable sort-exports/sort-exports */

/**
 * NullT is a class that represents the JavaScript/TypeScript type of "null". T is short for "type".
 *
 * Do not instantiate this class directly and instead use the `Null` singleton.
 */
export class NullT {}

/**
 * Null is a singleton that represents an instantiated version of the `NullT` class.
 *
 * In TSTL, `null` transpiles to `nil`. This is problematic because if you use it as an object or
 * map value, the corresponding key will be deleted. You can work around this by using this `Null`.
 */
export const Null = new NullT();
