import { echo, isMain } from "isaacscript-common-node";
import { generateConfigs } from "./generateConfigs.mjs";
import { generateReadme } from "./generateReadme.mjs";
import { generateRules } from "./generateRules.mjs";

if (isMain()) {
  await generateAll();
}

export async function generateAll(quiet = false): Promise<void> {
  // Generating rules must come before configs and readme because it builds the "rules.ts" file
  // (which is parsed later on).
  if (!quiet) {
    echo("Generating rules...");
  }
  await generateRules();

  if (!quiet) {
    echo("Generating configs...");
  }
  await generateConfigs();

  if (!quiet) {
    echo("Generating readme...");
  }
  await generateReadme();

  if (!quiet) {
    echo("Success!");
  }
}
