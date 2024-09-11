import { $, lintScript } from "complete-node"; // eslint-disable-line import-x/no-extraneous-dependencies

await lintScript(async () => {
  const promises = [
    $`tsc --noEmit`,
    $`tsc --noEmit --project ./scripts/tsconfig.json`,
    $`eslint --max-warnings 0 .`,
  ];

  await Promise.all(promises);
});
