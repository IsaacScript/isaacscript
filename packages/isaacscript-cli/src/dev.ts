import { fatalError } from "isaacscript-common-node";
import path from "node:path";
import { fileExists, isDir } from "./file.js";

export function getAndValidateIsaacScriptMonorepoDirectory(
  projectPath: string,
  verbose: boolean,
): string {
  const parentDirectory = path.join(projectPath, "..");
  const isaacScriptMonorepoDirectory = path.join(
    parentDirectory,
    "isaacscript",
  );
  if (
    !fileExists(isaacScriptMonorepoDirectory, verbose) ||
    !isDir(isaacScriptMonorepoDirectory, verbose)
  ) {
    console.error(
      `Failed to find the IsaacScript repository at: ${isaacScriptMonorepoDirectory}`,
    );
    fatalError(
      "In order to link a development version of IsaacScript common, you must place the repositories side by side. (If you do not already have the IsaacScript repository cloned, then you need to fork the repo and then clone your fork.)",
    );
  }

  return isaacScriptMonorepoDirectory;
}
