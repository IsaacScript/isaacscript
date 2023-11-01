import { fatalError } from "isaacscript-common-node";
import type { Args } from "../../parseArgs.js";
import { getInputInt } from "../../prompt.js";

export async function promptSaveSlot(
  args: Args,
  yes: boolean,
): Promise<number> {
  if (args.saveSlot !== undefined) {
    // They specified the "--save-slot" command-line flag, so there is no need to prompt the user
    // for it.
    return args.saveSlot;
  }

  if (yes) {
    return 1;
  }

  const saveSlot = await getInputInt(
    "In-game, will you test your mod on save slot 1, 2, or 3?",
  );

  if (saveSlot !== 1 && saveSlot !== 2 && saveSlot !== 3) {
    fatalError("Error: You must choose a number between 1 and 3.");
  }

  return saveSlot;
}
