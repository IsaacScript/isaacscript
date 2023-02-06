import { error } from "isaacscript-common-ts";
import { execShellString } from "../../exec.js";
import { gitCommitAllAndPush } from "../../git.js";
import { getProjectPackageJSONField } from "../../json.js";
import { Args } from "../../parseArgs.js";

export function publishTypeScriptProject(args: Args): void {
  const verbose = args.verbose === true;

  if (!isLoggedInToNPM(verbose)) {
    error(
      'Failed to publish since you are not logged in to npm. Try doing "npm login".',
    );
  }

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
