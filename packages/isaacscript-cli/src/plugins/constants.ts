/**
 * `deprecated` is turned off due to expressions like:
 *
 * ```lua
 * local __TS__Unpack = table.unpack or unpack
 * ```
 *
 * `redundant-parameter` is turned off to expressions like:
 *
 * ```lua
 * debug.traceback = function(thread, message, level)
 * ```
 */
export const LUA_LANGUAGE_SERVER_DISABLES = `
---@diagnostic disable
`
  .trim()
  .concat("\n\n");
