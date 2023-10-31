import { buildScript, buildTypeScript, rm } from "isaacscript-common-node";
import { assertDefined } from "isaacscript-common-ts";

await buildScript(async ({ outDir, packageRoot }) => {
  assertDefined(
    outDir,
    'Failed to get the "outDir" from the "tsconfig.json" file.',
  );
  rm(outDir);

  await buildTypeScript(packageRoot);
});
