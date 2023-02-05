import { Config } from "../../classes/Config.js";
import { Args } from "../../parseArgs.js";
import { publishIsaacScriptMod } from "./isaacscriptMod.js";
import { publishTypeScriptProject } from "./typeScript.js";

export async function publish(
  args: Args,
  config: Config,
  typeScript: boolean,
): Promise<void> {
  if (typeScript) {
    publishTypeScriptProject();
  } else {
    await publishIsaacScriptMod(args, config);
  }
}
