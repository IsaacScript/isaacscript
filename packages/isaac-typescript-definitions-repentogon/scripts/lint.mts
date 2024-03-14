import { $, lintScript } from "isaacscript-common-node";

await lintScript(async () => {
  const promises = [$`tsc --noEmit`, $`eslint --max-warnings 0 .`];
  await Promise.all(promises);
});
