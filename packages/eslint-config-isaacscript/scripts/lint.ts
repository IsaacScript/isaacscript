import { $, lintScript } from "complete-node";

await lintScript(async () => {
  const promises = [
    $`tsc --noEmit`,
    $`tsc --noEmit --project ./scripts/tsconfig.json`,
    $`eslint --max-warnings 0 .`,
  ];

  await Promise.all(promises);
});
