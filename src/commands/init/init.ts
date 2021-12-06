import chalk from "chalk";
import commandExists from "command-exists";
import path from "path";
import { CWD } from "../../constants";
import { checkIfProjectPathExists } from "./checkIfProjectPathExists";
import { checkModSubdirectory } from "./checkModSubdirectory";
import { checkModTargetDirectory } from "./checkModTargetDirectory";
import { createMod } from "./createMod";
import { getModsDir } from "./getModsDir";
import { getProjectPath } from "./getProjectPath";
import { installVSCodeExtensions } from "./installVSCodeExtensions";
import { promptSaveSlot } from "./promptSaveSlot";
import { promptVSCode } from "./promptVSCode";

export async function init(argv: Record<string, unknown>): Promise<void> {
  // Prompt the end-user for some information (and validate it as we go)
  const [projectPath, createNewDir] = await getProjectPath(argv);
  await checkIfProjectPathExists(projectPath);
  const modsDirectory = await getModsDir(argv);
  checkModSubdirectory(projectPath, modsDirectory);
  const projectName = path.basename(projectPath);
  await checkModTargetDirectory(modsDirectory, projectName);
  const saveSlot = await promptSaveSlot(argv);
  const skipNPMInstall = argv.skipNpmInstall === true;

  await createMod(
    projectName,
    projectPath,
    createNewDir,
    modsDirectory,
    saveSlot,
    skipNPMInstall,
  );
  await openVSCode(projectPath, argv);
  printFinishMessage(projectPath, projectName);
}

async function openVSCode(projectPath: string, argv: Record<string, unknown>) {
  const VSCodeCommand = getVSCodeCommand();
  if (VSCodeCommand === null) {
    console.log(
      'VSCode does not seem to be installed. (The "code" command is not in the path.) Skipping VSCode-related things.',
    );
    return;
  }

  installVSCodeExtensions(projectPath, VSCodeCommand);
  await promptVSCode(projectPath, argv, VSCodeCommand);
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
  console.log(`Now, start IsaacScript by typing ${commandsToType}.`);
}
