/**
 * Helper function to print a stack trace to the "log.txt" file, similar to JavaScript's
 * `console.trace()` function. This will only work if the `--luadebug` launch option is enabled or
 * the Racing+ sandbox is enabled.
 *
 * @param silent Optional. Whether or not to print an error message if the `--luadebug` launch
 * option is not turned on. False by default.
 */
export function traceback(silent = false): void {
  if (debug !== undefined) {
    // The --luadebug launch flag is enabled
    const tracebackMsg = debug.traceback();
    Isaac.DebugString(tracebackMsg);
    return;
  }

  if (sandboxTraceback !== undefined) {
    // The Racing+ sandbox is enabled
    sandboxTraceback();
    return;
  }

  if (!silent) {
    Isaac.DebugString(
      "Error: Cannot perform a traceback since --luadebug is not enabled.",
    );
  }
}
