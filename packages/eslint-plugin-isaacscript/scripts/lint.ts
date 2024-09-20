import { assertDefined } from "complete-common";
import { $, echo, exit, lintScript, readFile } from "complete-node";
import path from "node:path";
import { generateAll } from "./generate.js";
import { CONFIGS_DIRECTORY_PATH } from "./generateConfigs.js";
import { README_MD_PATH } from "./generateReadme.js";
import { RULES_TS_PATH } from "./generateRules.js";

const FILE_PATHS_TOUCHED_BY_GENERATE_SCRIPT = [
  // From "generateRules.mts":
  RULES_TS_PATH,
  // From "generateConfigs.mts":
  path.join(CONFIGS_DIRECTORY_PATH, "recommended.ts"),
  // From: "generateReadme.mts"
  README_MD_PATH,
] as const;

await lintScript(async () => {
  const promises = [
    $`tsc --noEmit`,
    $`tsc --noEmit --project ./scripts/tsconfig.json`,
    $`tsc --noEmit --project ./tests/tsconfig.json`,
    $`eslint --max-warnings 0 .`,
  ];

  await Promise.all(promises);

  // We cannot do generation at the same time as the other linting because it changes the
  // compilation output, creating a race condition.
  await checkGenerateChangedFiles();
});

async function checkGenerateChangedFiles() {
  const fileContentsMap = new Map<string, string>();
  for (const filePath of FILE_PATHS_TOUCHED_BY_GENERATE_SCRIPT) {
    const fileContents = readFile(filePath);
    fileContentsMap.set(filePath, fileContents);
  }

  await generateAll(true);

  let changed = false;
  for (const filePath of FILE_PATHS_TOUCHED_BY_GENERATE_SCRIPT) {
    const newFileContents = readFile(filePath);
    const oldFileContents = fileContentsMap.get(filePath);
    assertDefined(
      oldFileContents,
      `Failed to get the old file contents for path: ${filePath}`,
    );
    if (oldFileContents !== newFileContents) {
      changed = true;
      echo(`The "generate.ts" script changed the following file: ${filePath}`);
    }
  }

  if (changed) {
    echo('Run "npm run generate" and commit the changes.');
    exit(1);
  }
}
