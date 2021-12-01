import { traceback } from "./functions/debug";
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

  traceback();
  vanillaError(message, level);
}
