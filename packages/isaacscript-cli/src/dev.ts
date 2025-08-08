import { fatalError, isDirectory } from "complete-node";
import path from "node:path";

export async function getAndValidateIsaacScriptMonorepoDirectory(
  projectPath: string,
): Promise<string> {
  const isaacScriptMonorepoDirectory = path.resolve(
    projectPath,
    "..",
    "isaacscript",
  );

  const directory = await isDirectory(isaacScriptMonorepoDirectory);
  if (!directory) {
    console.error(
      `Failed to find the IsaacScript repository at: ${isaacScriptMonorepoDirectory}`,
    );
    fatalError(
      "In order to link a development version of IsaacScript common, you must place the repositories side by side. (If you do not already have the IsaacScript repository cloned, then you need to fork the repo and then clone your fork.)",
    );
  }

  return isaacScriptMonorepoDirectory;
}
