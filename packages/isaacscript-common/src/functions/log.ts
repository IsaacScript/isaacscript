/**
 * Helper function to prefix the name of the function and the line number before a debug message.
 */
export function getDebugPrependString(
  msg: string,
  // We use 3 as a default because:
  // - 1 - getDebugPrependString
  // - 2 - calling function
  // - 3 - the function that calls the calling function
  numParentFunctions = 3,
): string {
  // "debug" is not always defined like the Lua definitions imply.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (debug !== undefined) {
    // The "--luadebug" launch flag is enabled.
    const debugTable = debug.getinfo(numParentFunctions);
    if (debugTable !== undefined) {
      return `${debugTable.name}:${debugTable.linedefined} - ${msg}`;
    }
  }

  if (SandboxGetParentFunctionDescription !== undefined) {
    // The Racing+ sandbox is enabled.
    const parentFunctionDescription = SandboxGetParentFunctionDescription(
      numParentFunctions + 1,
    );
    return `${parentFunctionDescription} - ${msg}`;
  }

  return msg;
}

/**
 * Helper function to avoid typing out `Isaac.DebugString()`.
 *
 * If you have the "--luadebug" launch flag turned on or the Racing+ sandbox enabled, then this
 * function will also prepend the function name and the line number before the string.
 */
export function log(msg: string): void {
  const debugMsg = getDebugPrependString(msg);
  Isaac.DebugString(debugMsg);
}
