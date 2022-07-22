import chalk from "chalk";
import commandExists from "command-exists";
import path from "path";
import { CWD, PROJECT_NAME } from "../../constants";
import { getPackageManagerUsedForNewProject } from "../../packageManager";
import { Args } from "../../parseArgs";
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

export async function init(args: Args): Promise<void> {
  const packageManager = getPackageManagerUsedForNewProject(args);
  const noGit = args.noGit === true;
  const skipInstall = args.skipInstall === true;
  const useCurrentDir = args.useCurrentDir === true;
  const verbose = args.verbose === true;
  const vscode = args.vscode === true;
  const yes = args.yes === true;
  const forceName = args.forceName === true;

  // Prompt the end-user for some information (and validate it as we go).
  const [projectPath, createNewDir] = await getProjectPath(
    args,
    useCurrentDir,
    yes,
    forceName,
  );
  await checkIfProjectPathExists(projectPath, yes, verbose);
  const modsDirectory = await getModsDir(args, verbose);
  checkModSubdirectory(projectPath, modsDirectory);
  const projectName = path.basename(projectPath);
  await checkModTargetDirectory(modsDirectory, projectName, yes, verbose);
  const saveSlot = await promptSaveSlot(args, yes);
  const gitRemoteURL = await promptGitHubRepoOrGitRemoteURL(
    projectName,
    noGit,
    yes,
    verbose,
  );

  // Now that we have asked the user all of the questions we need, we can create the project.
  createMod(
    projectName,
    projectPath,
    createNewDir,
    modsDirectory,
    saveSlot,
    gitRemoteURL,
    skipInstall,
    packageManager,
    verbose,
  );

  await openVSCode(projectPath, vscode, yes, verbose);
  printFinishMessage(projectPath, projectName);
}

async function openVSCode(
  projectPath: string,
  vscode: boolean,
  yes: boolean,
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
  await promptVSCode(projectPath, VSCodeCommand, vscode, yes, verbose);
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
