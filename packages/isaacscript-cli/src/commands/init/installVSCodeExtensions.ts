import { error } from "isaacscript-common-ts";
import path from "path";
import { execShell } from "../../exec";
import * as file from "../../file";
import { getJSONC } from "../../json";

export function installVSCodeExtensions(
  projectPath: string,
  VSCodeCommand: string,
  verbose: boolean,
): void {
  // Installing extensions from inside WSL on Windows will result in the VSCode process never
  // exiting for some reason. Thus, skip this step on Linux. (Linux users will probably be smart
  // enough to install the extensions on their own.)
  if (process.platform === "linux") {
    return;
  }

  const extensions = getExtensionsFromJSON(projectPath, verbose);
  for (const extensionName of extensions) {
    execShell(VSCodeCommand, ["--install-extension", extensionName], verbose);
  }
}

function getExtensionsFromJSON(
  projectPath: string,
  verbose: boolean,
): string[] {
  const extensionsJSONPath = path.join(
    projectPath,
    ".vscode",
    "extensions.json",
  );

  if (!file.exists(extensionsJSONPath, verbose)) {
    return [];
  }

  const extensionsJSON = getJSONC(extensionsJSONPath, verbose);

  const { recommendations } = extensionsJSON;
  if (!Array.isArray(recommendations)) {
    error(
      'The "recommendations" field in the "extensions.json" file is not an array.',
    );
  }

  return recommendations as string[];
}
