import {
  exists,
  getMonorepoPackageNames,
  getPackageJSONScripts,
  isFile,
  lintCommands,
} from "complete-node";
import path from "node:path";

const MONOREPO_ROOT = path.resolve(import.meta.dirname, "..");

await lintCommands(import.meta.dirname, [
  // Use TypeScript to type-check the code.
  "tsc --noEmit",

  // Use ESLint to lint the TypeScript code.
  "eslint scripts *.mjs", // We have to exclude the packages directory.

  // Use Prettier to check formatting.
  // - "--log-level=warn" makes it only output errors.
  "prettier --log-level=warn --check .",

  // Use Knip to check for unused files, exports, and dependencies.
  // - "--treat-config-hints-as-errors" - Exit with non-zero code (1) if there are any configuration
  //   hints.
  "knip --treat-config-hints-as-errors",

  // Use CSpell to spell check every file.
  // - "--no-progress" and "--no-summary" make it only output errors.
  "cspell --no-progress --no-summary .",

  // Check for unused words in the CSpell configuration file.
  "cspell-check-unused-words",

  // Check for template updates.
  "bun ./packages/isaacscript-cli/src/main.ts check --ignore action.yml,bundleEntry.ts,ci.yml,eslint.config.mjs,lint.ts,tsconfig.json",

  // Check that the files referenced in "package.json" scripts exist. (Knip does not report these.)
  // eslint-disable-next-line unicorn/prefer-top-level-await
  ["checkPackageJSONScriptFiles", checkPackageJSONScriptFiles()],
]);

async function checkPackageJSONScriptFiles() {
  const packageNames = await getMonorepoPackageNames(MONOREPO_ROOT);
  const packageDirs = [
    MONOREPO_ROOT,
    ...packageNames.map((packageName) =>
      path.join(MONOREPO_ROOT, "packages", packageName),
    ),
  ];

  const errors: string[] = [];

  for (const packageDir of packageDirs) {
    // Some directories in the "packages" directory are not JavaScript packages.
    const packageJSONPath = path.join(packageDir, "package.json");
    // eslint-disable-next-line no-await-in-loop
    const packageJSONExists = await isFile(packageJSONPath);
    if (!packageJSONExists) {
      continue;
    }

    // eslint-disable-next-line no-await-in-loop
    const scripts = await getPackageJSONScripts(packageDir);
    if (scripts === undefined) {
      continue;
    }

    for (const [scriptName, script] of Object.entries(scripts)) {
      for (const filePath of getFilePathsFromScript(script)) {
        const fullPath = path.join(packageDir, filePath);
        // eslint-disable-next-line no-await-in-loop
        const fileExists = await exists(fullPath);
        if (!fileExists) {
          errors.push(
            `The "${scriptName}" script in "${packageJSONPath}" references a file that does not exist: ${filePath}`,
          );
        }
      }
    }
  }

  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }
}

/**
 * We consider every argument that contains a slash to be a relative file path, other than flags and
 * globs.
 */
function getFilePathsFromScript(script: string): readonly string[] {
  return script
    .split(" ")
    .map((arg) => arg.replaceAll(/["']/gv, ""))
    .filter(
      (arg) =>
        arg.includes("/")
        && !arg.startsWith("-")
        && !arg.includes("*")
        && !arg.includes(":"),
    );
}
