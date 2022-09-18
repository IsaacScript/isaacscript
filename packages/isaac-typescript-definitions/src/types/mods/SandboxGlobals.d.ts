/** @noSelfInFile */

/**
 * This is a global function provided by the Racing+ client sandbox. If the sandbox is not present,
 * it will be undefined.
 */
declare const SandboxGetDate: (() => string) | undefined;

/**
 * This is a global function provided by the Racing+ client sandbox. If the sandbox is not present,
 * it will be undefined.
 *
 * @param levels The amount of levels to look backwards in the call stack.
 */
declare const SandboxGetParentFunctionDescription:
  | ((levels: int) => void)
  | undefined;

/**
 * This is a global function provided by the Racing+ client sandbox. If the sandbox is not present,
 * it will be undefined.
 */
declare const SandboxGetTime: (() => float) | undefined;

/**
 * This is a global function provided by the Racing+ client sandbox. If the sandbox is not present,
 * it will be undefined.
 */
declare const SandboxGetTraceback: (() => string) | undefined;

/**
 * This is a global function provided by the Racing+ client sandbox. If the sandbox is not present,
 * it will be undefined.
 */
declare const SandboxTraceback: (() => void) | undefined;
