import type {
  Execa$,
  ExecaReturnBase,
  ExecaSyncError,
  Options,
  TemplateExpression,
} from "execa";
import { $ as dollarSignFunc } from "execa";

const EXECA_DEFAULT_OPTIONS = {
  // The default is "pipe". We want to pass stdout/stderr to the console, making commands work
  // similar to how they would in a Bash script.
  // https://nodejs.org/api/child_process.html#child_process_options_stdio
  stdio: "inherit",
} as const satisfies Options;

const dollarSignFuncWithOptions = dollarSignFunc(EXECA_DEFAULT_OPTIONS);

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
  return $sq(templates, ...expressions).stdout;
}

/**
 * A wrapper around the `$` function from `execa`. ("op" is short for "options".) This allows you to
 * get a custom executor function without having to consume "execa" directly.
 */
export function $op(options: Options): Execa$ {
  return dollarSignFunc(options);
}

/**
 * A wrapper around the `$` function from `execa`. ("q" is short for "quiet".) This is the same
 * thing as the `$` helper function, except the stdout/stderr is not passed through to the console.
 *
 * If an error occurs, the full JavaScript stack trace will be printed. Alternatively, if you expect
 * this command to return a non-zero exit code, you can enclose this function in a try/catch block.
 */
export async function $q(
  templates: TemplateStringsArray,
  ...expressions: TemplateExpression[]
): Promise<ExecaReturnBase<string>> {
  // We want to include the JavaScript stack trace in this instance since this function is used for
  // commands that should not generally fail.
  return dollarSignFunc(templates, ...expressions);
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
 * A wrapper around the `$.sync` function from `execa`. ("sq" is short for "sync quiet".) This is
 * the same thing as the `$s` helper function, except the stdout/stderr is not passed through to the
 * console.
 *
 * If an error occurs, the full JavaScript stack trace will be printed. Alternatively, if you expect
 * this command to return a non-zero exit code, you can enclose this function in a try/catch block.
 */
export function $sq(
  templates: TemplateStringsArray,
  ...expressions: TemplateExpression[]
): ExecaReturnBase<string> {
  // We want to include the JavaScript stack trace in this instance since this function is used for
  // commands that should not generally fail.
  return dollarSignFunc.sync(templates, ...expressions);
}
