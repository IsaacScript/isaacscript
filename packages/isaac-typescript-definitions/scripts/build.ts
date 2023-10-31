import { $, buildScript, buildTypeScript, rm } from "isaacscript-common-node";
import { assertDefined } from "isaacscript-common-ts";

await buildScript(async ({ outDir, packageRoot }) => {
  assertDefined(
    outDir,
    'Failed to get the "outDir" from the "tsconfig.json" file.',
  );
  rm(outDir);

  const promises: Array<Promise<unknown>> = [];

  promises.push(
    // We need to create JavaScript files in addition to Lua files because we want this package to
    // be usable in Jest tests.
    buildTypeScript(packageRoot),
    $`tstl`,
  );

  await Promise.all(promises);
});
