import { ModUpgraded } from "../classes/ModUpgraded";
import { enableExtraConsoleCommands } from "../features/extraConsoleCommands/exports";
import { removeFadeIn } from "../features/fadeInRemover";
import { enableFastReset } from "../features/fastReset";
import { saveDataManagerSetGlobal } from "../features/saveDataManager/exports";
import { setLogFunctionsGlobal, setTracebackFunctionsGlobal } from "./globals";

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
