import { $, lintScript } from "isaacscript-common-node";

await lintScript(async () => {
  const promises: Array<Promise<unknown>> = [];

  promises.push(
    $`tsc`,
    $`eslint --max-warnings 0 .`,
    $`remark --quiet --frail --ignore-pattern docs/isaacscript-common docs`,
  );

  await Promise.all(promises);
});
