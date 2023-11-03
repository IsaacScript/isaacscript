import { $, lintScript } from "isaacscript-common-node";

await lintScript(async () => {
  const promises: Array<Promise<unknown>> = [];

  promises.push($`tsc --noEmit`, $`eslint --max-warnings 0 .`);

  await Promise.all(promises);
});
