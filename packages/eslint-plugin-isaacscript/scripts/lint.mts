import chalk from "chalk";
import { $, echo, exit, lintScript, readFile } from "isaacscript-common-node";
import { assertDefined } from "isaacscript-common-ts";
import path from "node:path";
import { generateAll } from "./generateAll.mjs";
import { CONFIGS_DIRECTORY_PATH } from "./generateConfigs.mjs";
import { README_MD_PATH } from "./generateReadme.mjs";
import { RULES_TS_PATH } from "./generateRules.mjs";

const FILE_PATHS_TOUCHED_BY_GENERATE_SCRIPT = [
  // From "generateRules.mts":
  RULES_TS_PATH,
  // From "generateConfigs.mts":
  path.join(CONFIGS_DIRECTORY_PATH, "recommended.ts"),
  // From: "generateReadme.mts"
  README_MD_PATH,
] as const;

await lintScript(async () => {
  const promises: Array<Promise<unknown>> = [];

  promises.push(
    $`tsc`,
    $`eslint --max-warnings 0 .`,
    checkGenerateChangedFiles(),
  );

  await Promise.all(promises);
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
      echo(
        `The "${chalk.green(
          "generate.ts",
        )}" script changed the following file: ${chalk.green(filePath)}`,
      );
    }
  }

  if (changed) {
    exit(1);
  }
}
