import { generateConfigs } from "./generateConfigs";
import { generateReadme } from "./generateReadme";
import { generateRules } from "./generateRules";

export async function generateAll(): Promise<void> {
  // The rules must be generated before the configs/readme.
  console.log("Generating rules...");
  await generateRules();

  console.log("Generating configs...");
  await generateConfigs();

  console.log("Generating readme...");
  await generateReadme();
}
