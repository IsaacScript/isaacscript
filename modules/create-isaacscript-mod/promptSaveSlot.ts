import prompts from "prompts";

export default async function promptSaveSlot(
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
    validate: (value) =>
      value <= 0 || value >= 4
        ? "You must choose a number between 1 and 3."
        : true,
  });

  return response.saveSlot as number;
}
