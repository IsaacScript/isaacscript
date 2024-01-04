/**
 * Helper type to convert a read-only object into a writable object.
 *
 * This is the opposite of the built-in `Readonly` utility type.
 */
export type Writeable<T> = { -readonly [P in keyof T]: T[P] };
