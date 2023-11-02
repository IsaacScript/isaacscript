import { $s, buildScript, mv, rm } from "isaacscript-common-node";
import { assertDefined } from "isaacscript-common-ts";
import path from "node:path";

await buildScript(({ packageRoot, outDir }) => {
  $s`tsc`;
  reorganizeDistDirectory(packageRoot, outDir);
});

function reorganizeDistDirectory(
  packageRoot: string,
  outDir: string | undefined,
) {
  assertDefined(
    outDir,
    'Failed to get the "outDir" from the "tsconfig.json" file.',
  );

  const outPath = path.join(packageRoot, outDir);
  const projectName = path.basename(packageRoot);
  const realOutPath = path.join(outPath, projectName, "src");
  const tempPath = path.join(packageRoot, projectName);
  rm(tempPath);
  mv(realOutPath, tempPath);
  rm(outPath);
  mv(tempPath, outPath);
}
