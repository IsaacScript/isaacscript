/**
 * Helper function to get the name and the line number of the current calling function.
 *
 * For this function to work properly, the "--luadebug" flag must be enabled. Otherwise, it will
 * always return undefined.
 *
 * @param levels Optional. The amount of levels to look backwards in the call stack. Default is 3
 *               (because the first level is this function, the second level is the calling
 *               function, and the third level is the parent of the calling function).
 */
export function getParentFunctionDescription(
  // We use 3 as a default because:
  // - The first level is this function.
  // - The second level is the calling function.
  // - The third level is the parent of the calling function.
  levels = 3,
): string | undefined {
  // "debug" is not always defined like the Lua definitions imply.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (debug !== undefined) {
    // The "--luadebug" launch flag is enabled.
    const debugTable = debug.getinfo(levels);
    if (debugTable !== undefined) {
      return `${debugTable.name}:${debugTable.linedefined}`;
    }
  }

  if (SandboxGetParentFunctionDescription !== undefined) {
    // The Racing+ sandbox is enabled.
    return SandboxGetParentFunctionDescription(levels);
  }

  return undefined;
}

/**
 * Helper function to avoid typing out `Isaac.DebugString()`.
 *
 * If you have the "--luadebug" launch flag turned on or the Racing+ sandbox enabled, then this
 * function will also prepend the function name and the line number before the string.
 */
export function log(msg: string): void {
  const parentFunctionDescription = getParentFunctionDescription();
  const debugMsg =
    parentFunctionDescription === undefined
      ? msg
      : `${parentFunctionDescription} - ${msg}`;
  Isaac.DebugString(debugMsg);
}
