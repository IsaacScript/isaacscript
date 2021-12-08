import path from "path";
import { MAIN_TS } from "../../constants";
import { getInputYesNo } from "../../prompt";
import { execShell } from "../../util";

export async function promptVSCode(
  projectPath: string,
  argv: Record<string, unknown>,
  VSCodeCommand: string,
): Promise<void> {
  if (argv.vscode !== undefined) {
    // They supplied the "--vscode" command-line flag,
    // so there is no need to prompt the user
    openVSCode(projectPath, VSCodeCommand);
    return;
  }

  const shouldOpenVSCode = await getInputYesNo(
    "Do you want to open your new project in VSCode now?",
  );
  if (shouldOpenVSCode) {
    openVSCode(projectPath, VSCodeCommand);
  }
}

function openVSCode(projectPath: string, VSCodeCommand: string) {
  const MAIN_TS_PATH = path.join(projectPath, "src", MAIN_TS);
  execShell(VSCodeCommand, [projectPath, MAIN_TS_PATH]);
}
