import { $, lintScript } from "complete-node";

await lintScript(import.meta.dirname, async () => {
  await Promise.all([
    $`tsc --noEmit`,
    $`tsc --noEmit --project ./scripts/tsconfig.json`,
    $`eslint --max-warnings 0 .`,
  ]);
});
