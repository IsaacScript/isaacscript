import { execShell } from "../../exec.js";
import { getInputYesNo } from "../../prompt.js";

export async function promptVSCode(
  projectPath: string,
  VSCodeCommand: string,
  vscode: boolean,
  yes: boolean,
  verbose: boolean,
): Promise<void> {
  if (vscode) {
    // They supplied the "--vscode" command-line flag, so there is no need to prompt the user.
    openVSCode(projectPath, VSCodeCommand, verbose);
    return;
  }

  if (yes) {
    // They supplied the "--yes" command-line flag, which implies that they want a silent install,
    // so skip opening VSCode.
    return;
  }

  // The VSCode command does not work properly inside WSL on Windows.
  if (process.platform === "linux") {
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
  execShell(VSCodeCommand, [projectPath], verbose);
}
