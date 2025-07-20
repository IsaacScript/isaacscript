import { commandExists, fatalError, getJSONC, isFile } from "complete-node";
import path from "node:path";
import { execShell } from "../../exec.js";
import { getInputYesNo } from "../../prompt.js";

const VS_CODE_COMMANDS = [
  "code",
  "codium",
  "code-oss",
  "code-insiders",
] as const;

export async function vsCodeInit(
  projectPath: string,
  vscode: boolean,
  yes: boolean,
  verbose: boolean,
): Promise<void> {
  const VSCodeCommand = await getVSCodeCommand();
  if (VSCodeCommand === undefined) {
    console.log(
      'VSCode does not seem to be installed. (The "code" command is not in the path.) Skipping VSCode-related things.',
    );
    return;
  }

  await installVSCodeExtensions(projectPath, VSCodeCommand, verbose);
  await promptVSCode(projectPath, VSCodeCommand, vscode, yes, verbose);
}

async function getVSCodeCommand(): Promise<string | undefined> {
  for (const command of VS_CODE_COMMANDS) {
    // eslint-disable-next-line no-await-in-loop
    const exists = await commandExists(command);
    if (exists) {
      return command;
    }
  }

  return undefined;
}

async function installVSCodeExtensions(
  projectPath: string,
  VSCodeCommand: string,
  verbose: boolean,
) {
  // Installing extensions from inside WSL on Windows will result in the VSCode process never
  // exiting for some reason. Thus, skip this step on Linux. (Linux users will probably be smart
  // enough to install the extensions on their own.)
  if (process.platform === "linux") {
    return;
  }

  const extensions = await getExtensionsFromJSON(projectPath);
  for (const extensionName of extensions) {
    execShell(VSCodeCommand, ["--install-extension", extensionName], verbose);
  }
}

async function getExtensionsFromJSON(
  projectPath: string,
): Promise<readonly string[]> {
  const extensionsJSONPath = path.join(
    projectPath,
    ".vscode",
    "extensions.json",
  );

  if (!isFile(extensionsJSONPath)) {
    return [];
  }

  const extensionsJSON = await getJSONC(extensionsJSONPath);

  const { recommendations } = extensionsJSON;
  if (!Array.isArray(recommendations)) {
    fatalError(
      'The "recommendations" field in the "extensions.json" file is not an array.',
    );
  }

  for (const recommendation of recommendations) {
    if (typeof recommendation !== "string") {
      fatalError(
        'One of the entries in the "recommendations" field in the "extensions.json" file is not a string.',
      );
    }
  }

  return recommendations as string[];
}

async function promptVSCode(
  projectPath: string,
  VSCodeCommand: string,
  vscode: boolean,
  yes: boolean,
  verbose: boolean,
) {
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
