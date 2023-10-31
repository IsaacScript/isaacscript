import type {
  ExecaReturnBase,
  ExecaSyncError,
  TemplateExpression,
} from "execa";
import { $ as dollarSignFunc } from "execa";

/**
 * A wrapper around the `$` function from `execa`.
 *
 * - The stdout/stderr is passed through to the console.
 * - It throws nicer errors, omitting the JavaScript stack trace.
 */
export async function $(
  templates: TemplateStringsArray,
  ...expressions: TemplateExpression[]
): Promise<ExecaReturnBase<string>> {
  let returnBase: ExecaReturnBase<string>;

  try {
    returnBase = await dollarSignFuncWithOptions(templates, ...expressions);
  } catch (error: unknown) {
    const execaSyncError = error as ExecaSyncError;
    process.exit(execaSyncError.exitCode);
  }

  return returnBase;
}

const EXECA_DEFAULT_OPTIONS = {
  // This option passes stdout/stderr to the console, making commands work similar to how they would
  // in a Bash script.
  stdio: "inherit",
} as const;

const dollarSignFuncWithOptions = dollarSignFunc(EXECA_DEFAULT_OPTIONS);

/**
 * Helper function to run a command and grab the output. ("o" is short for "output".)
 *
 * If an error occurs, the full JavaScript stack trace will be printed. Alternatively, if you expect
 * this command to return a non-zero exit code, you can enclose this function in a try/catch block.
 *
 * This is a wrapper around the `$.sync` function from `execa`. (The `$.sync` function automatically
 * trims the `stdout`.)
 */
export function $o(
  templates: TemplateStringsArray,
  ...expressions: TemplateExpression[]
): string {
  return $ss(templates, ...expressions).stdout;
}

/**
 * A wrapper around the `$.sync` function from `execa`.
 *
 * - The stdout/stderr is passed through to the console.
 * - It throws nicer errors, omitting the JavaScript stack trace.
 */
export function $s(
  templates: TemplateStringsArray,
  ...expressions: TemplateExpression[]
): ExecaReturnBase<string> {
  let returnBase: ExecaReturnBase<string>;

  try {
    returnBase = dollarSignFuncWithOptions.sync(templates, ...expressions);
  } catch (error: unknown) {
    const execaSyncError = error as ExecaSyncError;
    process.exit(execaSyncError.exitCode);
  }

  return returnBase;
}

/**
 * A wrapper around the `$.sync` function from `execa`. ("ss" is short for "sync silent".) This is
 * the same thing as the `$s` helper function, except the stdout/stderr is not passed through to the
 * console.
 *
 * If an error occurs, the full JavaScript stack trace will be printed. Alternatively, if you expect
 * this command to return a non-zero exit code, you can enclose this function in a try/catch block.
 */
export function $ss(
  templates: TemplateStringsArray,
  ...expressions: TemplateExpression[]
): ExecaReturnBase<string> {
  // We want to include the JavaScript stack trace in this instance since `$ss` is used for commands
  // that should not generally fail.
  return dollarSignFunc.sync(templates, ...expressions);
}
