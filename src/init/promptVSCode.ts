import path from "path";
import prompts from "prompts";
import { MAIN_TS } from "../constants";
import { execShell } from "../misc";

export default async function promptVSCode(
  projectPath: string,
  argv: Record<string, unknown>,
): Promise<void> {
  if (argv.vscode) {
    // They supplied the "--vscode" command-line flag,
    // so there is no need to prompt the user
    openVSCode(projectPath);
    return;
  }

  const response = await prompts({
    type: "confirm",
    name: "VSCode",
    message: "Do you want to open your new project in VSCode now?",
    initial: true,
  });

  if (response.VSCode === true) {
    openVSCode(projectPath);
  }
}

function openVSCode(projectPath: string) {
  const MAIN_TS_PATH = path.join(projectPath, "src", MAIN_TS);
  execShell("code", [projectPath, MAIN_TS_PATH]);
}
