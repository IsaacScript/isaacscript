#!/usr/bin/env node

import chalk from "chalk";
import path from "path";
import updateNotifier from "update-notifier";
import pkg from "../../package.json";
import { CWD } from "../common/constants";
import { validateOS } from "../common/validateOS";
import checkIfProjectPathExists from "./checkIfProjectPathExists";
import checkModSubdirectory from "./checkModSubdirectory";
import checkModTargetDirectory from "./checkModTargetDirectory";
import createMod from "./createMod";
import getModsDirectory from "./getModsDirectory";
import getProjectPath from "./getProjectPath";
import parseArgs from "./parseArgs";
import promptSaveSlot from "./promptSaveSlot";
import promptVSCode from "./promptVSCode";

async function main(): Promise<void> {
  validateOS();

  // Get command-line arguments
  const argv = parseArgs();

  // Check for a new version
  updateNotifier({ pkg }).notify();

  // Prompt the end-user for some information
  const [projectPath, createNewDir] = await getProjectPath(argv);
  await checkIfProjectPathExists(projectPath);
  const modsDirectory = await getModsDirectory();
  checkModSubdirectory(projectPath, modsDirectory);
  const projectName = path.basename(projectPath);
  await checkModTargetDirectory(modsDirectory, projectName);
  const modTargetPath = path.join(modsDirectory, projectName);
  const saveSlot = await promptSaveSlot(argv);

  // Begin the creation of the new mod
  createMod(projectName, projectPath, createNewDir, modTargetPath, saveSlot);
  console.log(`Successfully created mod: ${chalk.green(projectName)}`);

  await promptVSCode(projectPath, argv);

  // Finished
  let commandsToType = "";
  if (projectPath !== CWD) {
    commandsToType += `"${chalk.green(`cd ${projectName}`)}" and `;
  }
  commandsToType += `"${chalk.green("npx isaacscript")}"`;
  console.log(`Now, start IsaacScript by typing ${commandsToType}.`);
  process.exit(0);
}

main().catch((err) => {
  console.error("IsaacScript failed:", err);
  process.exit(1);
});
