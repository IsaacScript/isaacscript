import chalk from "chalk";
import { isEnumValue, isSemanticVersion } from "complete-common";
import {
  $o,
  $op,
  $s,
  $sq,
  echo,
  exit,
  fatalError,
  getArgs,
  getElapsedSeconds,
  getPackageJSONScripts,
  getPackageJSONVersion,
  isDirectory,
  isGitRepositoryClean,
  isLoggedInToNPM,
} from "complete-node";
import path from "node:path";
import { updateIsaacScriptMonorepo } from "./update.js";

enum VersionBump {
  major = "major",
  minor = "minor",
  patch = "patch",
  dev = "dev",
}

const UPDATES_ENABLED = true as boolean;
const REPO_ROOT = path.join(import.meta.dirname, "..");

const startTime = Date.now();

// Validate that we are on the correct branch.
const branch = $o`git branch --show-current`;
if (branch !== "main") {
  echo("Error: You must be on the main branch before publishing.");
  exit(1);
}

// Validate that we can push and pull to the repository.
$s`git branch --set-upstream-to=origin/main main --quiet`;
$s`git pull --rebase --quiet`;
$s`git push --set-upstream origin main --quiet`;

// Validate that we are logged in to npm.
if (!isLoggedInToNPM()) {
  fatalError(
    `You are not logged into npm. Please run: ${chalk.green("npm adduser")}`,
  );
}

// Validate command-line arguments.
const args = getArgs();
const packageName = args[0];
if (packageName === undefined || packageName === "") {
  echo("Error: The package name is required as an argument.");
  exit(1);
}

const packagePath = path.join(REPO_ROOT, "packages", packageName);
if (!isDirectory(packagePath)) {
  echo(`Error: The directory of "${chalk.green(packagePath)}" does not exist.`);
  exit(1);
}

const versionBump = args[1];
if (versionBump === undefined || versionBump === "") {
  echo("Error: The version bump description is required as an argument.");
  exit(1);
}
if (!isEnumValue(versionBump, VersionBump) && !isSemanticVersion(versionBump)) {
  echo(`Error: The following version bump is not valid: ${versionBump}`);
  exit(1);
}

const $$ = $op({ cwd: packagePath });

// Before bumping the version, check to see if this package compiles and lints and tests (so that we
// can avoid unnecessary version bumps).
const scripts = getPackageJSONScripts(packagePath);
if (scripts !== undefined) {
  const promises: Array<Promise<unknown>> = [];

  for (const scriptName of ["build", "lint", "test"]) {
    const scriptCommand = scripts[scriptName];
    if (typeof scriptCommand === "string") {
      promises.push($$`npm run ${scriptName}`);
    }
  }

  await Promise.all(promises);
}

/**
 * Normally, the "version" command of the packager manager will automatically make a Git commit for
 * you. However:
 *
 * - The npm version command is bugged with subdirectories: https://github.com/npm/cli/issues/2010
 * - The yarn version command is bugged with with spaces inside of the --message" flag.
 *
 * Thus, we manually revert to doing a commit ourselves.
 */
if (isEnumValue(versionBump, VersionBump) && versionBump === VersionBump.dev) {
  $$.sync`npm version prerelease --preid=dev --commit-hooks=false`;
} else {
  $$.sync`npm version ${versionBump} --commit-hooks=false`;
}

// Manually make a Git commit. (See above comment.)
const packageJSONPath = path.join(packagePath, "package.json");
$sq`git add ${packageJSONPath}`;
const newVersion = getPackageJSONVersion(packagePath);
const tag = `${packageName}-${newVersion}`;
const commitMessage = `chore(release): ${tag}`;
$sq`git commit --message ${commitMessage}`;
$sq`git tag ${tag}`;
// (Defer doing a "git push" until the end so that we only trigger a single CI run.)

// Upload the package to npm.
const npmTag =
  isEnumValue(versionBump, VersionBump) && versionBump === VersionBump.dev
    ? "next"
    : "latest";
// - The "--access=public" flag is only technically needed for the first publish (unless the package
//   is a scoped package), but it is saved here for posterity.
// - The "--ignore-scripts" flag is needed since the "npm publish" command will run the "publish"
//   script in the "package.json" file, causing an infinite loop.
$$.sync`npm publish --access=public --ignore-scripts --tag=${npmTag}`;

const elapsedSeconds = getElapsedSeconds(startTime);
const secondsText = elapsedSeconds === 1 ? "second" : "seconds";
const version = getPackageJSONVersion(packagePath);
console.log(
  `Successfully published package "${chalk.green(
    packageName,
  )}" version "${chalk.green(version)}" in ${elapsedSeconds} ${secondsText}.`,
);

// Finally, check for dependency updates to ensure that we keep the monorepo up to date.
if (UPDATES_ENABLED) {
  console.log("Checking for monorepo updates...");
  updateIsaacScriptMonorepo();

  if (!isGitRepositoryClean(REPO_ROOT)) {
    const gitCommitMessage = "chore: updating dependencies";
    $sq`git add --all`;
    $sq`git commit --message ${gitCommitMessage}`;
  }
}

$sq`git push --set-upstream origin main`;
