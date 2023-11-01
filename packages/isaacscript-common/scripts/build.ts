import { Extractor, ExtractorConfig } from "@microsoft/api-extractor";
import {
  $,
  appendFile,
  buildScript,
  cp,
  fatalError,
  rm,
} from "isaacscript-common-node";
import { assertDefined } from "isaacscript-common-ts";
import path from "node:path";

await buildScript(async ({ packageRoot, outDir }) => {
  assertDefined(
    outDir,
    'Failed to get the "outDir" from the "tsconfig.json" file.',
  );

  // In addition to the normal compilation, we want to bundle the entire library into one file
  // specifically for Lua consumers. We also include `isaac-typescript-definitions` in the bundled
  // exports so that Lua users do not have to consume two separate libraries.
  const indexTSPath = path.join(packageRoot, "src", "index.ts");
  const indexLuaTSPath = path.join(packageRoot, "src", "indexLua.ts");
  cp(indexTSPath, indexLuaTSPath);
  appendFile(indexLuaTSPath, 'export * from "isaac-typescript-definitions";');

  const promises: Array<Promise<unknown>> = [];

  promises.push($`tstl`, $`tstl --project tsconfig.bundle.json`);

  await Promise.all(promises);

  rm(indexLuaTSPath);

  scrubInternalExports(packageRoot);
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
 *
 * Note that we deliberately invoke API extractor from its API. If we try to run it like this:
 *
 * ```ts
 * $s`npx api-extractor run`; // `api-extractor` is noisy and we only care if it fails.
 * ```
 *
 * Then it will cause a weird error in CI having to do with a "\r" character.
 */
function scrubInternalExports(packageRoot: string) {
  const apiExtractorJSONPath = path.join(packageRoot, "api-extractor.json");
  const extractorConfig =
    ExtractorConfig.loadFileAndPrepare(apiExtractorJSONPath);
  const extractorResult = Extractor.invoke(extractorConfig);

  // There seems to be no way to suppress the following annoying output: "Analysis will use the
  // bundled TypeScript version x.x.x. The target project appears to use TypeScript x.x.x which is
  // newer than the bundled compiler engine; consider upgrading API Extractor."

  if (!extractorResult.succeeded) {
    fatalError("API Extractor failed.");
  }
}
