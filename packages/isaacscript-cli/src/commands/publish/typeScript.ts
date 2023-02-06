import { error } from "isaacscript-common-ts";
import { BUILD_SCRIPT, LINT_SCRIPT } from "../../constants.js";
import { PackageManager } from "../../enums/PackageManager.js";
import { execShell, execShellString } from "../../exec.js";
import { fileExists } from "../../file.js";
import { gitCommitAllAndPush } from "../../git.js";
import { getProjectPackageJSONField } from "../../json.js";
import { Args } from "../../parseArgs.js";

export function publishTypeScriptProject(
  args: Args,
  packageManager: PackageManager,
): void {
  const skipLint = args.skipLint === true;
  const verbose = args.verbose === true;

  if (!isLoggedInToNPM(verbose)) {
    error(
      'Failed to publish since you are not logged in to npm. Try doing "npm login".',
    );
  }

  incrementVersion(args, packageManager);
  buildProject(verbose);
  lintProject(skipLint, verbose);

  const version = getProjectPackageJSONField("version", verbose);
  gitCommitAllAndPush(`chore: release ${version}`, verbose);

  execShellString("npm publish --access public", verbose);

  const projectName = getProjectPackageJSONField("name", verbose);
  console.log(`Published ${projectName} version ${version} successfully.`);
}

function isLoggedInToNPM(verbose: boolean): boolean {
  const { exitStatus } = execShellString("npm whoami", verbose, true);
  return exitStatus === 0;
}

export function incrementVersion(
  args: Args,
  packageManager: PackageManager,
): void {
  const skipIncrement = args.skipIncrement === true;
  const verbose = args.verbose === true;

  if (skipIncrement) {
    return;
  }

  const versionFlag = getVersionFlag(args);
  // The "--no-git-tag-version" flag will prevent the package manager from both making a commit and
  // adding a tag.
  execShellString(
    `${packageManager} version --no-git-tag-version --${versionFlag}`,
    verbose,
  );
}

function getVersionFlag(args: Args): string {
  const major = args.major === true;
  if (major) {
    return "major";
  }

  const minor = args.minor === true;
  if (minor) {
    return "minor";
  }

  const patch = args.patch === true;
  if (patch) {
    return "patch";
  }

  // Default to a patch version.
  return "patch";
}

function buildProject(verbose: boolean) {
  if (!fileExists(BUILD_SCRIPT, verbose)) {
    error(`Failed to find the build script: ${BUILD_SCRIPT}`);
  }

  console.log(`Running "${BUILD_SCRIPT}"...`);

  const { exitStatus, stdout } = execShell(
    "bash",
    [BUILD_SCRIPT],
    verbose,
    true,
  );

  if (exitStatus !== 0) {
    execShellString("git reset --hard", verbose);
    error("Failed to build the project:", stdout);
  }
}

function lintProject(skipLint: boolean, verbose: boolean) {
  if (skipLint) {
    return;
  }

  if (!fileExists(LINT_SCRIPT, verbose)) {
    error(`Failed to find the build script: ${LINT_SCRIPT}`);
  }

  console.log(`Running "${LINT_SCRIPT}"...`);

  const { exitStatus, stdout } = execShell(
    "bash",
    [LINT_SCRIPT],
    verbose,
    true,
  );

  if (exitStatus !== 0) {
    execShellString("git reset --hard", verbose);
    error("Failed to lint the project:", stdout);
  }
}
