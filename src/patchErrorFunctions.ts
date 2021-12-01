import { getTraceback } from "./functions/debug";
import { isLuaDebugEnabled } from "./functions/util";

declare let error: ErrorFunction;

// eslint-disable-next-line no-underscore-dangle,@typescript-eslint/naming-convention
declare let __PATCHED_ERROR: boolean | undefined;

type ErrorFunction = (this: void, message: string, level?: number) => never;

// The actual type is "ErrorFunction | undefined", but TypeScript doesn't like this
let vanillaError: ErrorFunction;

/**
 * In Lua, the `error` function will tell you the line number of the error, but not give you a full
 * traceback of the parent functions, which is unlike how JavaScript works. This function monkey
 * patches the `error` function to add this functionality.
 *
 * Traceback functionality can only be added if the "--luadebug" flag is turned on, so this function
 * does nothing if the "--luadebug" flag is disabled.
 */
export function patchErrorFunction(): void {
  // Only replace the function if the "--luadebug" launch flag is enabled
  if (!isLuaDebugEnabled()) {
    return;
  }

  // Do nothing if the function was already patched
  if (__PATCHED_ERROR !== undefined) {
    return;
  }
  __PATCHED_ERROR = true;

  vanillaError = error;
  error = errorWithTraceback;
}

function errorWithTraceback(
  this: void,
  message: string,
  level?: number,
): never {
  if (vanillaError === undefined) {
    error(message, level);
  }

  if (level === undefined) {
    level = 1;
  }

  const tracebackOutput = getTraceback();
  const slimmedTracebackOutput = slimTracebackOutput(tracebackOutput);
  Isaac.DebugString(slimmedTracebackOutput);

  // We add one to the level so that the error message appears to originate at the parent function
  vanillaError(message, level + 1);
}

/**
 * Some lines of the traceback output will not be relevant to the error that just occurred. Thus, to
 * reduce noise, we can always remove these lines.
 */
function slimTracebackOutput(tracebackOutput: string) {
  const lineSeparator = "\n";
  const lines = tracebackOutput.split(lineSeparator);

  // The first line will always be equal to "stack traceback:"

  // The second line of the traceback will always be the "getTraceback" function,
  // so remove it
  if (lines[1].includes("in upvalue 'getTraceback'")) {
    lines.splice(1, 1);
  }

  // The third line of the traceback will always be in the "errorWithTraceback" function,
  // so remove it
  if (lines[1].includes("in function 'error'")) {
    lines.splice(1, 1);
  }

  const slimmedTracebackOutput = lines.join(lineSeparator);

  return slimmedTracebackOutput;
}
