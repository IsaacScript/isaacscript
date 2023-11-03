import {
  $s,
  buildScript,
  fixMonorepoPackageDistDirectory,
} from "isaacscript-common-node";
import { assertDefined } from "isaacscript-common-ts";

await buildScript(({ packageRoot, outDir }) => {
  assertDefined(
    outDir,
    'Failed to get the "outDir" from the "tsconfig.json" file.',
  );

  $s`tsc`;
  fixMonorepoPackageDistDirectory(packageRoot, outDir);
});
