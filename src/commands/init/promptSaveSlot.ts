import prompts from "prompts";
import { error } from "../../util";

export async function promptSaveSlot(
  argv: Record<string, unknown>,
): Promise<number> {
  if (argv.saveSlot !== undefined) {
    // They specified the "--save-slot" command-line flag,
    // so there is no need to prompt the user for it
    return argv.saveSlot as number;
  }

  const response = await prompts({
    type: "number",
    name: "saveSlot",
    message: "In-game, will you test your mod on save slot 1, 2, or 3?",
    initial: 1,
  });

  if (
    response.saveSlot !== 1 &&
    response.saveSlot !== 2 &&
    response.saveSlot !== 3
  ) {
    error("Error: You must choose a number between 1 and 3.");
  }

  return response.saveSlot as number;
}
