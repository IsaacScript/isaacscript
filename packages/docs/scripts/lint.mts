import { lintCommands } from "complete-node";

await lintCommands(import.meta.dirname, [
  "tsc --noEmit",
  "tsc --noEmit --project ./scripts/tsconfig.json",
  "eslint --max-warnings 0 .",
]);
