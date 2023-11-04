import { fatalError, getJSONC, isFile } from "isaacscript-common-node";
import path from "node:path";
import { execShell } from "../../exec.js";

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

  const extensions = getExtensionsFromJSON(projectPath);
  for (const extensionName of extensions) {
    execShell(VSCodeCommand, ["--install-extension", extensionName], verbose);
  }
}

function getExtensionsFromJSON(projectPath: string): string[] {
  const extensionsJSONPath = path.join(
    projectPath,
    ".vscode",
    "extensions.json",
  );

  if (!isFile(extensionsJSONPath)) {
    return [];
  }

  const extensionsJSON = getJSONC(extensionsJSONPath);

  const { recommendations } = extensionsJSON;
  if (!Array.isArray(recommendations)) {
    fatalError(
      'The "recommendations" field in the "extensions.json" file is not an array.',
    );
  }

  return recommendations as string[];
}
