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
