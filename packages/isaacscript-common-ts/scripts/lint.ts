import { $, lintScript } from "isaacscript-common-node";

await lintScript(async () => {
  const promises: Array<Promise<unknown>> = [];

  promises.push(
    // We cannot put "noEmit" in the "tsconfig.json" file since it would prevent creating ".d.ts"
    // files.
    $`tsc --noEmit`,
    $`eslint --max-warnings 0 .`,
  );

  await Promise.all(promises);
});
