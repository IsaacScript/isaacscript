import chalk from "chalk";
import commandExists from "command-exists";
import path from "path";
import { CWD } from "../../constants";
import checkIfProjectPathExists from "./checkIfProjectPathExists";
import checkModSubdirectory from "./checkModSubdirectory";
import checkModTargetDirectory from "./checkModTargetDirectory";
import createMod from "./createMod";
import getModsDir from "./getModsDir";
import getProjectPath from "./getProjectPath";
import installVSCodeExtensions from "./installVSCodeExtensions";
import promptSaveSlot from "./promptSaveSlot";
import promptVSCode from "./promptVSCode";

export default async function init(
  argv: Record<string, unknown>,
): Promise<void> {
  // Prompt the end-user for some information (and validate it as we go)
  const [projectPath, createNewDir] = await getProjectPath(argv);
  await checkIfProjectPathExists(projectPath);
  const modsDirectory = await getModsDir(argv);
  checkModSubdirectory(projectPath, modsDirectory);
  const projectName = path.basename(projectPath);
  await checkModTargetDirectory(modsDirectory, projectName);
  const saveSlot = await promptSaveSlot(argv);

  // Begin the creation of the new mod
  createMod(projectName, projectPath, createNewDir, modsDirectory, saveSlot);
  console.log(`Successfully created mod: ${chalk.green(projectName)}`);

  const VSCodeCommand = getVSCodeCommand();
  if (VSCodeCommand === null) {
    console.log(
      'VSCode does not seem to be installed. (The "code" command is not in the path.) Skipping VSCode-related things.',
    );
  } else {
    installVSCodeExtensions(projectPath);
    await promptVSCode(projectPath, argv, VSCodeCommand);
  }

  // Finished
  let commandsToType = "";
  if (projectPath !== CWD) {
    commandsToType += `"${chalk.green(`cd ${projectName}`)}" and `;
  }
  commandsToType += `"${chalk.green("npx isaacscript")}"`;
  console.log(`Now, start IsaacScript by typing ${commandsToType}.`);
}

function getVSCodeCommand() {
  for (const VSCodeCommand of ["code", "codium", "code-oss"]) {
    if (commandExists.sync(VSCodeCommand)) {  
      return VSCodeCommand;
    }
  }

  return null;
}
