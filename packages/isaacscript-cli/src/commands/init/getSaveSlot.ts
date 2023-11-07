import { fatalError } from "isaacscript-common-node";
import { parseIntSafe } from "isaacscript-common-ts";
import { getInputInt } from "../../prompt.js";

export async function getSaveSlot(
  saveSlotOption: string | undefined,
  yes: boolean,
): Promise<number> {
  if (saveSlotOption !== undefined) {
    const saveSlot = parseIntSafe(saveSlotOption);
    if (saveSlot === undefined) {
      fatalError(`The save slot of "${saveSlotOption}" is not a number.`);
    }

    return saveSlot;
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
