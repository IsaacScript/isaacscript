/**
 * This is a global function provided by the Racing+ client sandbox. If the sandbox is not present,
 * it will be undefined.
 */
declare const traceback: (() => void) | undefined;

/**
 * This is a global function provided by the Racing+ client sandbox. If the sandbox is not present,
 * it will be undefined.
 *
 * @param levels The amount of levels to look backwards in the call stack.
 */
declare const getParentFunctionDescription: ((levels: int) => void) | undefined;
