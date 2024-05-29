import {
  $s,
  buildScript,
  fixMonorepoPackageDistDirectory,
} from "isaacscript-common-node";
import { assertDefined } from "isaacscript-common-ts";

await buildScript(async ({ packageRoot, outDir }) => {
  assertDefined(
    outDir,
    'Failed to get the "outDir" from the "tsconfig.json" file.',
  );

  compile(packageRoot, outDir);
});

function compile(packageRoot: string, outDir: string) {
  $s`tsc`;
  fixMonorepoPackageDistDirectory(packageRoot, outDir);
}
