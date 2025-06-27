import { fatalError, isDirectory } from "complete-node";
import path from "node:path";

export function getAndValidateIsaacScriptMonorepoDirectory(
  projectPath: string,
): string {
  const isaacScriptMonorepoDirectory = path.resolve(
    projectPath,
    "..",
    "isaacscript",
  );

  if (!isDirectory(isaacScriptMonorepoDirectory)) {
    console.error(
      `Failed to find the IsaacScript repository at: ${isaacScriptMonorepoDirectory}`,
    );
    fatalError(
      "In order to link a development version of IsaacScript common, you must place the repositories side by side. (If you do not already have the IsaacScript repository cloned, then you need to fork the repo and then clone your fork.)",
    );
  }

  return isaacScriptMonorepoDirectory;
}
