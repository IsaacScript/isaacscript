import { $, buildScript } from "isaacscript-common-node";

await buildScript(async () => {
  const promises: Array<Promise<unknown>> = [];

  promises.push(
    // We need to create JavaScript files in addition to Lua files because we want this package to
    // be usable in Jest tests. We disable declarations because running `tstl` will create
    // declarations and we don't want the two processes to stomp on each other.
    $`tsc --declaration false --declarationMap false`,
    $`tstl`,
  );

  await Promise.all(promises);
});
