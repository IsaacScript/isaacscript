/**
 * This is the custom JSON parser library called "json.lua". It is located at:
 * https://github.com/rxi/json.lua
 *
 * This parser was measured to be 11.8 times faster than the vanilla parser at decoding a sample
 * "save1.dat" file.
 */

export function encode(this: void, data: unknown): string;
export function decode(this: void, data: string): unknown;
