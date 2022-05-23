import { generateConfigs } from "./generateConfigs";
import { generateReadme } from "./generateReadme";
import { generateRules } from "./generateRules";

export function generateAll(): void {
  // The rules must be generated before the configs/readme.
  console.log("Generating rules...");
  generateRules();

  console.log("Generating configs...");
  generateConfigs();

  console.log("Generating readme...");
  generateReadme();
}
