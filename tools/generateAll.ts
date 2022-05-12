import { generateConfigs } from "./generateConfigs";
import { generateReadme } from "./generateReadme";
import { generateRules } from "./generateRules";

export function generateAll(): void {
  console.log("Generating rules...");
  generateRules(); // Rules must be generated before configs/readme

  console.log("Generating configs...");
  generateConfigs();

  console.log("Generating readme...");
  generateReadme();
}
