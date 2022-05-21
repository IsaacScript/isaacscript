import chalk from "chalk";
import * as JSONC from "jsonc-parser";
import path from "path";
import { execShell } from "../../exec";
import * as file from "../../file";
import { error } from "../../utils";

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

interface ExtensionsJSON {
  recommendations: string[];
}

function getExtensionsFromJSON(projectPath: string, verbose: boolean) {
  const extensionsJSONPath = path.join(
    projectPath,
    ".vscode",
    "extensions.json",
  );

  if (!file.exists(extensionsJSONPath, verbose)) {
    return [];
  }

  const extensionsJSONRaw = file.read(extensionsJSONPath, verbose);

  let extensionsJSON: ExtensionsJSON;
  try {
    extensionsJSON = JSONC.parse(extensionsJSONRaw) as ExtensionsJSON;
  } catch (err) {
    error(
      `Failed to parse the "${chalk.green(extensionsJSONPath)}" file:`,
      err,
    );
  }

  return extensionsJSON.recommendations;
}
