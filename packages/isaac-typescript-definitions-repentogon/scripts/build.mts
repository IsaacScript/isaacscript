import { $, buildScript, cp, prependFile } from "complete-node";
import path from "node:path";

await buildScript(async (packageRoot) => {
  await Promise.all([
    $`tstl`,

    // We need to create JavaScript files in addition to Lua files because we want this package to
    // be usable in Jest tests. We disable declarations because running `tstl` will create
    // declarations and we don't want the two processes to stomp on each other.
    $`tsc --declaration false --declarationMap false`,
  ]);

  // If we let the triple slash reference in the "./dist/index.ts" file point to the
  // "./src/types/index.d.ts", things will not work properly because the compiled enums are
  // different from the TypeScript source enums. Specifically, the `strict-enums` lint rule will
  // start to complain about e.g. `RoomType` not matching `RoomType`. Thus, we need to copy all of
  // the types into the "dist" directory so that they resolve properly.
  const outDir = "dist";
  const indexDTSPath = path.join(outDir, "index.d.ts");
  prependFile(indexDTSPath, '/// <reference path="./types/index.d.ts" />\n\n');
  const srcPath = path.join(packageRoot, "src", "types");
  const dstPath = path.join(outDir, "types");
  cp(srcPath, dstPath);
});
