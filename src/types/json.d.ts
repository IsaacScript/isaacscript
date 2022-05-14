/**
 * The "json.lua" module exists at:
 *
 * ```
 * C:\Program Files (x86)\Steam\steamapps\common\The Binding of Isaac Rebirth\resources\scripts\json.lua
 * ```
 *
 * It is intended to be consumed by mods via:
 *
 * ```lua
 * local json = require("json")
 * ```
 *
 * We need to specify the "@noResolution" tstl compiler annotation because the "json.lua" file is
 * not supposed to exist inside of end-user mods.
 *
 * @noResolution
 */
declare module "json" {
  function encode(this: void, data: unknown): string;
  function decode(this: void, data: string): unknown;
}
