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
---@diagnostic disable: assign-type-mismatch
---@diagnostic disable: deprecated
---@diagnostic disable: redefined-local
---@diagnostic disable: redundant-parameter
---@diagnostic disable: unused-function
---@diagnostic disable: unused-local
---@diagnostic disable: unused-vararg
`
  .trim()
  .concat("\n\n");
