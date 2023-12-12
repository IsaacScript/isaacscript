import {
  $,
  buildScript,
  fixMonorepoPackageDistDirectory,
} from "isaacscript-common-node";
import { assertDefined } from "isaacscript-common-ts";

await buildScript(async ({ packageRoot, outDir }) => {
  assertDefined(
    outDir,
    'Failed to get the "outDir" from the "tsconfig.json" file.',
  );

  await compile(packageRoot, outDir);
});

async function compile(packageRoot: string, outDir: string) {
  await $`tsc`;
  fixMonorepoPackageDistDirectory(packageRoot, outDir);
}
