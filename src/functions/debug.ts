/**
 * Helper function to get a stack trace.
 *
 * This will only work if the `--luadebug` launch option is enabled or the Racing+ sandbox is
 * enabled.
 */
export function getTraceback(): string {
  if (debug !== undefined) {
    // The --luadebug launch flag is enabled
    return debug.traceback();
  }

  if (sandboxGetTraceback !== undefined) {
    return sandboxGetTraceback();
  }

  return 'stack traceback:\n(the "--luadebug" flag is not enabled)';
}

/**
 * Helper function to print a stack trace to the "log.txt" file, similar to JavaScript's
 * `console.trace` function.
 *
 * This will only work if the `--luadebug` launch option is enabled or the Racing+ sandbox is
 * enabled.
 */
export function traceback(): void {
  const tracebackOutput = getTraceback();
  Isaac.DebugString(tracebackOutput);
}

function setDebugFunctionsGlobal() {
  if (debug === undefined) {
    return;
  }

  const globals = _G as Record<string, unknown>;

  globals.getTraceback = getTraceback;
  globals.traceback = traceback;
}

// Set the debug functions global by default
setDebugFunctionsGlobal();
