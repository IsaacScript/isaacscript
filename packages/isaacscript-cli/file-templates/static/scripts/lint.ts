import { commandExists, lintCommands } from "complete-node";

const commands = [
  // Use TypeScript to type-check the code.
  "tsc --noEmit",
  "tsc --noEmit --project ./scripts/tsconfig.json",

  // Use ESLint to lint the TypeScript code.
  "eslint",

  // Use Prettier to check formatting.
  // - "--log-level=warn" makes it only output errors.
  "prettier --log-level=warn --check .",

  // Use ts-prune to check for unused exports.
  // - "--error" makes it return an error code of 1 if unused exports are found.
  "ts-prune --error",

  // Use CSpell to spell check every file.
  // - "--no-progress" and "--no-summary" make it only output errors.
  "cspell --no-progress --no-summary",

  // Check for unused words in the CSpell configuration file.
  "cspell-check-unused-words",
];

const pythonExists = await commandExists("uvx");
if (pythonExists) {
  commands.push("uvx isaac-xml-validator --quiet");
}

await lintCommands(import.meta.dirname, commands);
