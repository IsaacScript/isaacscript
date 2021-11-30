/**
 * Helper function to print a stack trace to the "log.txt" file, similar to JavaScript's
 * `console.trace()` function. This will only work if the `--luadebug` launch option is enabled.
 */
export function traceback(): void {
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

  Isaac.DebugString(
    "Error: Cannot perform a traceback since --luadebug is not enabled.",
  );
}
