import { generateConfigs } from "./generateConfigs";
import { generateReadme } from "./generateReadme";
import { generateRules } from "./generateRules";

export function generateAll(): void {
  // The rules must be generated before the configs/readme.
  console.log("Generating rules..."); // eslint-disable-line no-console
  generateRules();

  console.log("Generating configs..."); // eslint-disable-line no-console
  generateConfigs();

  console.log("Generating readme..."); // eslint-disable-line no-console
  generateReadme();
}
