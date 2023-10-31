import type { ValidatedConfig } from "../../classes/ValidatedConfig.js";
import { execShellString } from "../../exec.js";
import { getReleaseGitCommitMessage, gitCommitAllAndPush } from "../../git.js";
import { getProjectPackageJSONField } from "../../json.js";
import type { Args } from "../../parseArgs.js";
import { getInputString } from "../../prompt.js";
import { publishIsaacScriptMod } from "./isaacscriptMod.js";
import { prePublish } from "./prePublish.js";
import { validate } from "./validate.js";

export async function publish(
  args: Args,
  config: ValidatedConfig,
  typeScript: boolean,
): Promise<void> {
  const { setVersion } = args;
  const verbose = args.verbose === true;

  validate(typeScript, setVersion, verbose);
  prePublish(args, typeScript);

  await (typeScript
    ? publishTypeScriptProject(args)
    : publishIsaacScriptMod(args, config));
}

async function publishTypeScriptProject(args: Args) {
  const dryRun = args.dryRun === true;
  const verbose = args.verbose === true;
  const projectName = getProjectPackageJSONField("name", verbose);
  const version = getProjectPackageJSONField("version", verbose);

  if (dryRun) {
    execShellString("git reset --hard", verbose); // Revert the version changes.
  } else {
    const releaseGitCommitMessage = getReleaseGitCommitMessage(version);
    gitCommitAllAndPush(releaseGitCommitMessage, verbose);

    let command = "npm publish --access=public";
    if (args.otp === true) {
      const otpCode = await getInputString(
        "Type in the two-factor OTP code tied to the npm account. (Just press enter if you do not have 2FA enabled on your npm account.)",
      );
      if (otpCode !== "") {
        command += ` --otp=${otpCode}`;
      }
    }
    execShellString(command, verbose);
  }

  const dryRunSuffix = dryRun ? " (dry-run)" : "";
  console.log(
    `Published ${projectName} version ${version} successfully${dryRunSuffix}.`,
  );
}
