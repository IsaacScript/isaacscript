import { buildCJSAndESM, buildScript } from "isaacscript-common-node";
import { assertDefined } from "isaacscript-common-ts";

await buildScript(async ({ outDir }) => {
  assertDefined(
    outDir,
    'Failed to get the "outDir" from the "tsconfig.json" file.',
  );

  await buildCJSAndESM(outDir);
});
