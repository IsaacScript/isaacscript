import { echo } from "isaacscript-common-node";
import { generateConfigs } from "./generateConfigs.mjs";
import { generateReadme } from "./generateReadme.mjs";
import { generateRules } from "./generateRules.mjs";

export async function generateAll(silent = false): Promise<void> {
  // Generating rules must come before configs and readme because it builds the "rules.ts" file
  // (which is parsed later on).
  if (!silent) {
    echo("Generating rules...");
  }
  await generateRules();

  if (!silent) {
    echo("Generating configs...");
  }
  await generateConfigs();

  if (!silent) {
    echo("Generating readme...");
  }
  await generateReadme();

  if (!silent) {
    echo("Success!");
  }
}
