import { $s, buildScript, replaceTextInFile } from "isaacscript-common-node";
import { assertDefined } from "isaacscript-common-ts";
import path from "node:path";

await buildScript(({ outDir }) => {
  assertDefined(
    outDir,
    'Failed to get the "outDir" from the "tsconfig.json" file.',
  );

  $s`unbuild`;

  fixBuggedReadonlyConstructors(outDir);
});

/**
 * For some reason `tsup` (and `unbuild`) will append a "$1" to the `ReadonlyMap` and `ReadonlySet`
 * constructors. Thus, we must manually fix this.
 */
function fixBuggedReadonlyConstructors(outDir: string) {
  removeBuggedTypeSuffix(outDir, "Map");
  removeBuggedTypeSuffix(outDir, "Set");
}

function removeBuggedTypeSuffix(outDir: string, typeName: string) {
  const searchValue = `Readonly${typeName}$1`;
  const replaceValue = `Readonly${typeName}`;

  const filePath1 = path.join(outDir, "index.d.ts");
  replaceTextInFile(filePath1, searchValue, replaceValue);

  const filePath2 = path.join(outDir, "index.d.mts");
  replaceTextInFile(filePath2, searchValue, replaceValue);

  const filePath3 = path.join(outDir, "index.d.cts");
  replaceTextInFile(filePath3, searchValue, replaceValue);
}
