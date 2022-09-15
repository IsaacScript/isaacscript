/**
 * `deprecated` is turned off due to expressions like:
 *
 * ```lua
 * local __TS__Unpack = table.unpack or unpack
 * ```
 */
export const LUA_LANGUAGE_SERVER_DISABLES = `
---@diagnostic disable: deprecated
`
  .trim()
  .concat("\n\n");
