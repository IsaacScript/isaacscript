import {
  $,
  $q,
  appendFile,
  buildScript,
  copyFileOrDirectory,
  deleteFileOrDirectory,
} from "complete-node";
import path from "node:path";

await buildScript(import.meta.dirname, async (packageRoot) => {
  // In addition to the normal compilation, we want to bundle the entire library into one file
  // specifically for Lua consumers. We also include `isaac-typescript-definitions` in the bundled
  // exports so that Lua users do not have to consume two separate libraries.
  const indexTSPath = path.join(packageRoot, "src", "index.ts");
  const indexLuaTSPath = path.join(packageRoot, "src", "indexLua.ts");
  await copyFileOrDirectory(indexTSPath, indexLuaTSPath);
  await appendFile(
    indexLuaTSPath,
    'export * from "isaac-typescript-definitions";',
  );

  await Promise.all([
    $`tstl`,
    $`tstl --project tsconfig.bundle.json --declaration false --declarationMap false`,

    // We need to create JavaScript files in addition to Lua files because we want this package to
    // be usable in Jest tests. We disable declarations because running `tstl` will create
    // declarations and we don't want the two processes to stomp on each other.
    $`tsc --declaration false --declarationMap false`,
  ]);

  await deleteFileOrDirectory(indexLuaTSPath);

  // Make sure that the transpiled "jsonLua.js" file gets copied over. (TSTL will automatically
  // transfer "jsonLua.lua", but not "jsonLua.js".)
  const srcLibPath = path.join(packageRoot, "src", "lib");
  const dstLibPath = path.join(packageRoot, "dist", "lib");
  await copyFileOrDirectory(srcLibPath, dstLibPath);

  await scrubInternalExports();
});

/**
 * Scrub internal exports from the declaration file using the ".d.ts rollup" feature of API
 * Extractor: https://api-extractor.com/
 *
 * If we did not use API Extractor, we would instead have to manually append "@internal" JSDoc tags
 * to every single private function in order for the TypeScript compiler to remove it from the
 * generated ".d.ts" file. API Extractor automatically knows which functions are public or private
 * by parsing the "index.ts" file, and generates a new ".d.ts" file with private exports removed.
 * Note that end-users can still manually import internal functions with e.g.:
 *
 * ```ts
 * import { RunInNFrames } from "isaacscript-common/dist/src/classes/features/other/RunInNFrames";
 * ```
 *
 * But by removing them from the ".d.ts" file, they will not appear as part of auto-complete, which
 * is good enough for our case. However, a downside of this method is that the declaration maps will
 * not work:
 * https://github.com/microsoft/rushstack/issues/1886
 * https://github.com/timocov/dts-bundle-generator/issues/218
 */
async function scrubInternalExports() {
  await $q`npx api-extractor run`; // `api-extractor` is noisy and we only care if it fails.
}
