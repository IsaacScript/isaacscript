import { $s, buildScript, rm } from "isaacscript-common-node";
import { assertDefined } from "isaacscript-common-ts";

await buildScript(({ outDir }) => {
  assertDefined(
    outDir,
    'Failed to get the "outDir" from the "tsconfig.json" file.',
  );
  rm(outDir);

  $s`esbuild src/index.ts --bundle --minify --log-level=warning --outdir=${outDir}`;
});
