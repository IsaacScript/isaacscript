import {
  $,
  $o,
  $s,
  $ss,
  fatalError,
  getArgs,
  getPackageJSONScripts,
  getPackageJSONVersion,
  isDirectory,
  isGitClean,
  script,
} from "isaacscript-common-node";
import { isEnumValue } from "isaacscript-common-ts";
import path from "node:path";
import { updateIsaacScriptMonorepo } from "./update.js";

enum VersionBump {
  major = "major",
  minor = "minor",
  patch = "patch",
  dev = "dev",
}

await script(async ({ packageRoot }) => {
  // Validate that we are on the correct branch.
  const branch = $o`git branch --show-current`;
  if (branch === "main") {
    console.log("Error: You must be on the main branch before publishing.");
    process.exit(1);
  }

  // Validate that we can push and pull to the repository.
  $s`git branch --set-upstream-to=origin/main main --quiet`;
  $s`git pull --rebase --quiet`;
  $s`git push --set-upstream origin main --quiet`;

  // Validate that we are logged in to npm.
  try {
    $ss`npm whoami`;
  } catch {
    fatalError("You are not logged into npm. Please run: npm adduser");
  }

  // Validate command-line arguments.
  const args = getArgs();
  const packageName = args[0];
  if (packageName === undefined || packageName === "") {
    console.log("Error: The package name is required as an argument.");
    process.exit(1);
  }

  const packageDir = path.join(packageRoot, "packages", packageName);
  if (!isDirectory(packageDir)) {
    console.log('Error: The directory of "$PACKAGE_DIR" does not exist.');
    process.exit(1);
  }

  const versionBump = args[1];
  if (versionBump === undefined || versionBump === "") {
    console.log(
      "Error: The version bump description is required as an argument.",
    );
    process.exit(1);
  }
  if (!isEnumValue(versionBump, VersionBump)) {
    console.log(
      `Error: The following version bump is not valid: ${versionBump}`,
    );
    process.exit(1);
  }

  process.chdir(packageDir);

  // Before bumping the version, check to see if this package compiles and lints and tests (so that
  // we can avoid unnecessary version bumps).
  const scripts = getPackageJSONScripts(packageDir);
  if (scripts !== undefined) {
    const promises: Array<Promise<unknown>> = [];

    for (const scriptName of ["build", "lint", "test"]) {
      const scriptCommand = scripts[scriptName];
      if (typeof scriptCommand === "string") {
        promises.push($`npm run ${scriptName}`);
      }
    }

    await Promise.all(promises);
  }

  /**
   * Normally, the "version" command of the packager manager will automatically make a Git commit
   * for you. However:
   *
   * - The npm version command is bugged with subdirectories: https://github.com/npm/cli/issues/2010
   * - The yarn version command is bugged with with spaces inside of the --message" flag.
   *
   * Thus, we manually revert to doing a commit ourselves.
   */
  if (versionBump === VersionBump.dev) {
    $s`npm version prerelease --preid=dev --commit-hooks=false`;
  } else {
    $s`npm version ${versionBump} --commit-hooks=false`;
  }

  // Manually make a Git commit. (See above comment.)
  $s`git add "${packageDir}/package.json"`;
  const newVersion = getPackageJSONVersion(packageDir);
  const tag = `${packageName}-${newVersion}`;
  const commitMessage = `chore(release): ${tag}`;
  $s`git commit --message ${commitMessage}`;
  $s`git tag ${tag}`;
  // (Defer doing a "git push" until the end so that we only trigger a single CI run.)

  // Upload the package to npm.
  const npmTag = versionBump === VersionBump.dev ? "next" : "latest";
  // The "--access=public" flag is only technically needed for the first publish, but it is saved
  // here for posterity.
  $s`npm publish --access=public --tag=${npmTag}`; // --otp=${otpCode}

  // Finally, check for dependency updates to ensure that we keep the monorepo up to date.
  await updateIsaacScriptMonorepo();

  if (!isGitClean()) {
    const gitCommitMessage = "chore: updating dependencies";
    $s`git add --all`;
    $s`git commit --message ${gitCommitMessage}`;
  }

  $s`git push --set-upstream origin main`;
}, "published");
