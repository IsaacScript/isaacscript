import { fatalError } from "complete-node";
import { getInputInt } from "../../prompt.js";

export async function getSaveSlot(
  saveSlotOption: number | undefined,
  yes: boolean,
): Promise<number> {
  if (saveSlotOption !== undefined) {
    return saveSlotOption;
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
