import {
  $,
  $s,
  buildScript,
  buildTypeScript,
  rm,
} from "isaacscript-common-node";
import { assertDefined } from "isaacscript-common-ts";

const TSCONFIG_SCHEMA_PATH = "schemas/tsconfig-isaacscript-section-schema.json";
const ISAACSCRIPT_SCHEMA_PATH = "schemas/isaacscript-schema.json";

await buildScript(async ({ outDir, packageRoot }) => {
  assertDefined(
    outDir,
    'Failed to get the "outDir" from the "tsconfig.json" file.',
  );
  rm(outDir);

  const promises: Array<Promise<unknown>> = [];

  promises.push(
    buildTypeScript(packageRoot),
    // Generate the JSON schema for the special "isaacscript" section in "tsconfig.json".
    $`ts-json-schema-generator --path src/interfaces/IsaacScriptTSConfig.ts --tsconfig tsconfig.json --out ${TSCONFIG_SCHEMA_PATH}`,
    // Generate the JSON schema for the "isaacscript.json" file.
    $`ts-json-schema-generator --path src/classes/Config.ts --tsconfig $DIR/tsconfig.json --out ${ISAACSCRIPT_SCHEMA_PATH}`,
  );

  await Promise.all(promises);

  $s`prettier ${TSCONFIG_SCHEMA_PATH} ${ISAACSCRIPT_SCHEMA_PATH} --write`;
});
