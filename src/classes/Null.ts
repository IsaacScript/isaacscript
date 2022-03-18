/**
 * Null is a class that represents the JavaScript/TypeScript type of "null".
 *
 * Do not instantiate this class directly and instead use the `Nul` singleton.
 */
export class Null {}

/**
 * Nul is a singleton that represents an instantiated version of the `Null` class.
 *
 * In TSTL, `null` transpiles to `nil`. This is problematic because if you use it as an object or
 * map value, the corresponding key will be deleted. You can work around this by using this `Nul`,
 * which is an instantiated version of the `Null` custom class.
 */
export const Nul = new Null();
