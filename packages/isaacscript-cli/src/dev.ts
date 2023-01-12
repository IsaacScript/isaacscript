import { error } from "isaacscript-common-ts";
import path from "path";
import * as file from "./file";

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
    !file.exists(isaacScriptMonorepoDirectory, verbose) ||
    !file.isDir(isaacScriptMonorepoDirectory, verbose)
  ) {
    console.error(
      `Failed to find the IsaacScript repository at: ${isaacScriptMonorepoDirectory}`,
    );
    error(
      "In order to link a development version of IsaacScript common, you must place the repositories side by side. (If you do not already have the IsaacScript repository cloned, then you need to fork the repo and then clone your fork.)",
    );
  }

  return isaacScriptMonorepoDirectory;
}
