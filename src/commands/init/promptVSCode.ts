import path from "path";
import { MAIN_TS } from "../../constants";
import { execShell } from "../../exec";
import { getInputYesNo } from "../../prompt";

export async function promptVSCode(
  projectPath: string,
  VSCodeCommand: string,
  vscode: boolean,
  verbose: boolean,
): Promise<void> {
  if (vscode) {
    // They supplied the "--vscode" command-line flag, so there is no need to prompt the user.
    openVSCode(projectPath, VSCodeCommand, verbose);
    return;
  }

  const shouldOpenVSCode = await getInputYesNo(
    "Do you want to open your new project in VSCode now?",
  );
  if (shouldOpenVSCode) {
    openVSCode(projectPath, VSCodeCommand, verbose);
  }
}

function openVSCode(
  projectPath: string,
  VSCodeCommand: string,
  verbose: boolean,
) {
  const MAIN_TS_PATH = path.join(projectPath, "src", MAIN_TS);
  execShell(VSCodeCommand, [projectPath, MAIN_TS_PATH], verbose);
}
