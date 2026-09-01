import { getTraceback, isLuaDebugEnabled } from "./functions/debugFunctions";

declare let error: ErrorFunction;
declare let __PATCHED_ERROR: boolean | undefined; // eslint-disable-line

type ErrorFunction = (this: void, message: string, level?: number) => never;

const LINE_SEPARATOR = "\n";

/**
 * These must be listed in order from how they appear in the traceback from top to bottom, or they
 * won't be properly removed.
 */
const USELESS_TRACEBACK_MESSAGES = [
  // The second line of the traceback will always be the "getTraceback" function.
  "in upvalue 'getTraceback'",
  "in function 'sandbox.GetTraceback'",

  // The third line of the traceback will always be a line within the "errorWithTraceback" function.
  "in function 'error'",
] as const;

let vanillaError: ErrorFunction | undefined;

/**
 * In Lua, the `error` function will tell you the line number of the error, but not give you a full
 * traceback of the parent functions, which is unlike how JavaScript works. This function monkey
 * patches the `error` function to add this functionality.
 *
 * Traceback functionality can only be added if the "--luadebug" flag is turned on, so this function
 * does nothing if the "--luadebug" flag is disabled.
 */
export function patchErrorFunction(): void {
  // Only replace the function if the "--luadebug" launch flag is enabled.
  if (!isLuaDebugEnabled()) {
    return;
  }

  // Do nothing if the function was already patched.
  if (__PATCHED_ERROR !== undefined) {
    return;
  }
  __PATCHED_ERROR = true;

  vanillaError = error;
  error = errorWithTraceback;
}

function errorWithTraceback(this: void, message: string, level = 1): never {
  if (vanillaError === undefined) {
    error(message, level);
  }

  const tracebackOutput = getTraceback();
  const slimmedTracebackOutput = slimTracebackOutput(tracebackOutput);
  message += "\n";
  message += slimmedTracebackOutput;

  // We add one to the level so that the error message appears to originate at the parent function.
  return vanillaError(message, level + 1);
}

/**
 * Some lines of the traceback output will not be relevant to the error that just occurred. Thus, to
 * reduce noise, we can always remove these lines.
 */
function slimTracebackOutput(tracebackOutput: string) {
  for (const msg of USELESS_TRACEBACK_MESSAGES) {
    tracebackOutput = removeLinesContaining(tracebackOutput, msg);
  }

  return tracebackOutput;
}

function removeLinesContaining(msg: string, containsMsg: string) {
  const lines = msg.split(LINE_SEPARATOR);
  const linesThatDontContain = lines.filter(
    (line) => !line.includes(containsMsg),
  );

  return linesThatDontContain.join(LINE_SEPARATOR);
}
