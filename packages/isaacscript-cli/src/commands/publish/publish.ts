import { Config } from "../../classes/Config.js";
import { execShellString } from "../../exec.js";
import { gitCommitAllAndPush } from "../../git.js";
import { getProjectPackageJSONField } from "../../json.js";
import { Args } from "../../parseArgs.js";
import { publishIsaacScriptMod } from "./isaacscriptMod.js";
import { prePublish } from "./prePublish.js";
import { validate } from "./validate.js";

export async function publish(
  args: Args,
  config: Config,
  typeScript: boolean,
): Promise<void> {
  const { setVersion } = args;
  const verbose = args.verbose === true;

  validate(typeScript, setVersion, verbose);
  prePublish(args);

  if (typeScript) {
    const version = getProjectPackageJSONField("version", verbose);
    gitCommitAllAndPush(`chore: release ${version}`, verbose);
    execShellString("npm publish --access public", verbose);
    const projectName = getProjectPackageJSONField("name", verbose);
    console.log(`Published ${projectName} version ${version} successfully.`);
  } else {
    await publishIsaacScriptMod(args, config);
  }
}
