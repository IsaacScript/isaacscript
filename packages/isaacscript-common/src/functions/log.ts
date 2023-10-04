import { isNumber } from "./types";

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
  this: void,
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
 * If you have the "--luadebug" launch flag turned on, then this function will also prepend the
 * function name and the line number before the string, like this:
 *
 * ```text
 * [INFO] - Lua Debug: saveToDisk:42494 - The save data manager wrote data to the "save#.dat" file.
 * ```
 *
 * Subsequently, it is recommended that you turn on the "--luadebug" launch flag when developing
 * your mod so that debugging becomes a little bit easier.
 *
 * @param msg The message to log.
 * @param includeParentFunction Optional. Whether to prefix the message with the function name and
 *                              line number, as shown in the above example. Default is true.
 */
export function log(
  this: void,
  msg: string | number,
  includeParentFunction = true,
): void {
  if (isNumber(msg)) {
    msg = msg.toString();
  }

  const parentFunctionDescription = includeParentFunction
    ? getParentFunctionDescription()
    : undefined;
  const debugMsg =
    parentFunctionDescription === undefined
      ? msg
      : `${parentFunctionDescription} - ${msg}`;
  Isaac.DebugString(debugMsg);
}

/**
 * Helper function to log a message to the "log.txt" file and to print it to the screen at the same
 * time.
 */
export function logAndPrint(msg: string): void {
  log(msg);
  print(msg);
}

/**
 * Helper function to log an error message and also print it to the console for better visibility.
 *
 * This is useful in situations where using the `error` function would be dangerous (since it
 * prevents all of the subsequent code in the callback from running).
 */
export function logError(this: void, msg: string): void {
  const errorMsg = `Error: ${msg}`;
  logAndPrint(errorMsg);
}
