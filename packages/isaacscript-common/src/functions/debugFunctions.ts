import { log } from "./log";

/**
 * Helper function to get the amount of elapsed time for benchmarking / profiling purposes.
 *
 * For more information, see the documentation for the `getTime` helper function.
 *
 * @param time The milliseconds (int) or fractional seconds (float).
 * @param useSocketIfAvailable Optional. Whether to use the `socket.gettime` method, if available.
 *                             Default is true. If set to false, the `Isaac.GetTime()` method will
 *                             always be used.
 */
export function getElapsedTimeSince(
  time: int | float,
  useSocketIfAvailable = true,
): int {
  return getTime(useSocketIfAvailable) - time;
}

/**
 * Helper function to get the current time for benchmarking / profiling purposes.
 *
 * The return value will either be in seconds or milliseconds, depending on if the "--luadebug" flag
 * is turned on.
 *
 * If the "--luadebug" flag is present, then this function will use the `socket.gettime` method,
 * which returns the epoch timestamp in seconds (e.g. "1640320492.5779"). This is preferable over
 * the more conventional `Isaac.GetTime` method, since it has one extra decimal point of precision.
 *
 * If the "--luadebug" flag is not present, then this function will use the `Isaac.GetTime` method,
 * which returns the number of milliseconds since the computer's operating system was started (e.g.
 * "739454963").
 *
 * @param useSocketIfAvailable Optional. Whether to use the `socket.gettime` method, if available.
 *                             Default is true. If set to false, the `Isaac.GetTime()` method will
 *                             always be used.
 */
export function getTime(useSocketIfAvailable = true): int | float {
  if (useSocketIfAvailable) {
    if (SandboxGetTime !== undefined) {
      return SandboxGetTime();
    }

    if (isLuaDebugEnabled()) {
      const [ok, requiredSocket] = pcall(require, "socket");
      if (ok) {
        const socket = requiredSocket as Socket;
        return socket.gettime();
      }
    }
  }

  // We could divide the result by 1000 in order to unify the return type with `socket.gettime`.
  // However, this causes floating point inaccuracies in the number when subtracting, so it is
  // better to keep it as an integer.
  return Isaac.GetTime();
}

/**
 * Helper function to get a stack trace.
 *
 * This will only work if the `--luadebug` launch option is enabled. If it isn't, then a error
 * string will be returned.
 */
export function getTraceback(this: void): string {
  if (SandboxGetTraceback !== undefined) {
    return SandboxGetTraceback();
  }

  // "debug" will be equal to undefined if the "--luadebug" launch flag is not present.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (debug !== undefined) {
    // The --luadebug launch flag is enabled.
    return debug.traceback();
  }

  return 'stack traceback:\n(the "--luadebug" flag is not enabled)';
}

/**
 * Players can boot the game with an launch option called "--luadebug", which will enable additional
 * functionality that is considered to be unsafe. For more information about this flag, see the
 * wiki: https://bindingofisaacrebirth.fandom.com/wiki/Launch_Options
 *
 * When this flag is enabled, the global environment will be slightly different. The differences are
 * documented here: https://wofsauge.github.io/IsaacDocs/rep/Globals.html
 *
 * This function uses the `package` global variable as a proxy to determine if the "--luadebug" flag
 * is enabled.
 *
 * Note that this function will return false if the Racing+ sandbox is enabled, even if the
 * "--luadebug" flag is really turned on. If checking for this case is needed, check for the
 * presence of the `sandboxGetTraceback` function.
 */
export function isLuaDebugEnabled(): boolean {
  // "package" is not always defined like the Lua definitions imply.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return _G.package !== undefined;
}

/**
 * Helper function to log a stack trace to the "log.txt" file, similar to JavaScript's
 * `console.trace` function.
 *
 * This will only work if the `--luadebug` launch option is enabled. If it isn't, then a error
 * string will be logged.
 */
export function traceback(this: void): void {
  const tracebackOutput = getTraceback();
  log(tracebackOutput);
}
