import { ModUpgraded } from "../classes/ModUpgraded";
import { enableExtraConsoleCommands } from "../features/extraConsoleCommands/exports";
import { removeFadeIn } from "../features/fadeInRemover";
import { enableFastReset } from "../features/fastReset";
import { saveDataManagerSetGlobal } from "../features/saveDataManager/exports";
import * as logExports from "./log";
import { log } from "./log";
import * as logEntitiesExports from "./logEntities";
import * as logMiscExports from "./logMisc";

/**
 * Helper function to enable some IsaacScript features that are useful when developing a mod. They
 * should not be enabled when your mod goes to production (i.e. when it is uploaded to the Steam
 * Workshop).
 *
 * The list of development features that are enabled are as follows:
 *
 * - `saveDataManagerSetGlobal` - Sets your local variables registered with the save data manager as
 *   global variables so you can access them from the in-game console.
 * - `setLogFunctionsGlobal` - Sets the various log functions global so that you can access them
 *   from the in-game console.
 * - `enableExtraConsoleCommands` - Enables many extra in-game console commands that make warping
 *   around easier (like e.g. `angel` to warp to the Angel Room).
 * - `enableFastReset` - Makes it so that the r key resets the game instantaneously.
 * - `removeFadeIn` - Removes the slow fade in that occurs at the beginning of the run, so that you
 *   can immediately start playing or testing.
 */
export function enableDevFeatures(mod: ModUpgraded): void {
  saveDataManagerSetGlobal();
  setLogFunctionsGlobal();
  setTracebackFunctionsGlobal();
  enableExtraConsoleCommands(mod);
  enableFastReset();
  removeFadeIn();
}

/**
 * Helper function to get a stack trace.
 *
 * This will only work if the `--luadebug` launch option is enabled or the Racing+ sandbox is
 * enabled.
 */
export function getTraceback(): string {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (debug !== undefined) {
    // The --luadebug launch flag is enabled.
    return debug.traceback();
  }

  if (SandboxGetTraceback !== undefined) {
    return SandboxGetTraceback();
  }

  return 'stack traceback:\n(the "--luadebug" flag is not enabled)';
}

/**
 * Players can boot the game with an launch option called "--luadebug", which will enable additional
 * functionality that is considered to be unsafe. For more information about this flag, see the
 * wiki: https://bindingofisaacrebirth.fandom.com/wiki/Launch_Options
 *
 * When this flag is enabled, the global environment will be slightly different. The differences are
 * documented here: https://wofsauge.github.io/IsaacDocs/rep/Globals.html
 *
 * This function uses the `package` global variable as a proxy to determine if the "--luadebug" flag
 * is enabled or not.
 *
 * Note that this function will return false if the Racing+ sandbox is enabled, even if the
 * "--luadebug" flag is really turned on. If checking for this case is needed, check for the
 * presence of the `sandboxGetTraceback` function.
 */
export function isLuaDebugEnabled(): boolean {
  // "package" is not always defined like the Lua definitions imply.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return _G.package !== undefined;
}

/**
 * Converts every `isaacscript-common` function that begins with "log" to a global function.
 *
 * This is useful when printing out variables from the in-game debug console.
 */
export function setLogFunctionsGlobal(): void {
  const globals = _G as Record<string, unknown>;

  for (const exports of [logExports, logMiscExports, logEntitiesExports]) {
    // eslint-disable-next-line isaacscript/no-object-any
    for (const [logFuncName, logFunc] of Object.entries(exports)) {
      globals[logFuncName] = logFunc;
    }
  }
}

export function setTracebackFunctionsGlobal(): void {
  const globals = _G as Record<string, unknown>;

  globals["getTraceback"] = getTraceback;
  globals["traceback"] = traceback;
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
  log(tracebackOutput);
}
