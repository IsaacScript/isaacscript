import { $, buildScript, buildTypeScript } from "isaacscript-common-node";

await buildScript(async ({ packageRoot }) => {
  const promises: Array<Promise<unknown>> = [];

  promises.push(
    // We need to create JavaScript files in addition to Lua files because we want this package to
    // be usable in Jest tests.
    buildTypeScript(packageRoot),
    $`tstl`,
  );

  await Promise.all(promises);
});
