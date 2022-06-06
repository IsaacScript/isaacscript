/**
 * The "json.lua" module exists at:
 *
 * ```text
 * C:\Program Files (x86)\Steam\steamapps\common\The Binding of Isaac Rebirth\resources\scripts\json.lua
 * ```
 *
 * IsaacScript mods should avoid consuming it directly and instead use the `jsonEncode` and
 * `jsonDecode` helper functions.
 *
 * @module
 */

/**
 * We need to specify the "@noResolution" TSTL compiler annotation here because the "json.lua" file
 * is not supposed to exist inside of end-user mods.
 *
 * @noResolution
 */
declare module "json" {
  function encode(this: void, data: unknown): string;
  function decode(this: void, data: string): unknown;
}
