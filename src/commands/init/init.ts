import chalk from "chalk";
import commandExists from "command-exists";
import path from "path";
import { CWD, PROJECT_NAME } from "../../constants";
import { checkIfProjectPathExists } from "./checkIfProjectPathExists";
import { checkModSubdirectory } from "./checkModSubdirectory";
import { checkModTargetDirectory } from "./checkModTargetDirectory";
import { createMod } from "./createMod";
import { getModsDir } from "./getModsDir";
import { getProjectPath } from "./getProjectPath";
import { promptGitHubRepoOrGitRemoteURL } from "./git";
import { installVSCodeExtensions } from "./installVSCodeExtensions";
import { promptSaveSlot } from "./promptSaveSlot";
import { promptVSCode } from "./promptVSCode";

export async function init(argv: Record<string, unknown>): Promise<void> {
  const vscode = argv.vscode === true;
  const skipNPMInstall = argv.skipNpmInstall === true;
  const verbose = argv.verbose === true;

  // Prompt the end-user for some information (and validate it as we go)
  const [projectPath, createNewDir] = await getProjectPath(argv);
  await checkIfProjectPathExists(projectPath, verbose);
  const modsDirectory = await getModsDir(argv);
  checkModSubdirectory(projectPath, modsDirectory);
  const projectName = path.basename(projectPath);
  await checkModTargetDirectory(modsDirectory, projectName, verbose);
  const saveSlot = await promptSaveSlot(argv);
  const gitRemoteURL = await promptGitHubRepoOrGitRemoteURL(
    projectName,
    verbose,
  );

  createMod(
    projectName,
    projectPath,
    createNewDir,
    modsDirectory,
    saveSlot,
    gitRemoteURL,
    skipNPMInstall,
    verbose,
  );

  await openVSCode(projectPath, vscode, verbose);
  printFinishMessage(projectPath, projectName);
}

async function openVSCode(
  projectPath: string,
  vscode: boolean,
  verbose: boolean,
) {
  const VSCodeCommand = getVSCodeCommand();
  if (VSCodeCommand === null) {
    console.log(
      'VSCode does not seem to be installed. (The "code" command is not in the path.) Skipping VSCode-related things.',
    );
    return;
  }

  installVSCodeExtensions(projectPath, VSCodeCommand, verbose);
  await promptVSCode(projectPath, VSCodeCommand, vscode, verbose);
}

function getVSCodeCommand() {
  for (const VSCodeCommand of ["code", "codium", "code-oss", "code-insiders"]) {
    if (commandExists.sync(VSCodeCommand)) {
      return VSCodeCommand;
    }
  }

  return null;
}

function printFinishMessage(projectPath: string, projectName: string) {
  let commandsToType = "";
  if (projectPath !== CWD) {
    commandsToType += `"${chalk.green(`cd ${projectName}`)}" and `;
  }
  commandsToType += `"${chalk.green("npx isaacscript")}"`;
  console.log(`Now, start ${PROJECT_NAME} by typing ${commandsToType}.`);
}
