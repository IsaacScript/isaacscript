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
  const skipNPMInstall = argv.skipNpmInstall === true;
  const useCurrentDir = argv.useCurrentDir === true;
  const verbose = argv.verbose === true;
  const vscode = argv.vscode === true;
  const yes = argv.yes === true;

  // Prompt the end-user for some information (and validate it as we go)
  const [projectPath, createNewDir] = await getProjectPath(
    argv,
    useCurrentDir,
    yes,
  );
  await checkIfProjectPathExists(projectPath, yes, verbose);
  const modsDirectory = await getModsDir(argv, verbose);
  checkModSubdirectory(projectPath, modsDirectory);
  const projectName = path.basename(projectPath);
  await checkModTargetDirectory(modsDirectory, projectName, yes, verbose);
  const saveSlot = await promptSaveSlot(argv, yes);
  const gitRemoteURL = await promptGitHubRepoOrGitRemoteURL(
    projectName,
    yes,
    verbose,
  );

  // Now that we have asked the user all of the questions we need, we can create the project
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
