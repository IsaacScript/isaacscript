import { $s, buildScript, replaceTextInFile } from "isaacscript-common-node";
import { assertDefined } from "isaacscript-common-ts";
import path from "node:path";

await buildScript(({ outDir }) => {
  assertDefined(
    outDir,
    'Failed to get the "outDir" from the "tsconfig.json" file.',
  );

  $s`unbuild`; // We use the `unbuild` library to output both ESM and CJS.
  fixBuggedReadonlyConstructors(outDir);
});

/**
 * For some reason `unbuild` (and `tsup`) will append a "$1" to the `ReadonlyMap` and `ReadonlySet`
 * constructors. Thus, we must manually fix this.
 */
function fixBuggedReadonlyConstructors(outDir: string) {
  removeBuggedTypeSuffix(outDir, "Map");
  removeBuggedTypeSuffix(outDir, "Set");
}

function removeBuggedTypeSuffix(outDir: string, typeName: string) {
  const searchValue = `Readonly${typeName}$1`;
  const replaceValue = `Readonly${typeName}`;

  for (const extension of ["ts", "mts", "cts"]) {
    const filePath1 = path.join(outDir, `index.d.${extension}`);
    replaceTextInFile(filePath1, searchValue, replaceValue);
  }
}
