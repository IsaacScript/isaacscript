import chalk from "chalk";
import path from "path";
import prompts from "prompts";
import * as configFile from "./configFile";
import {
  CONFIG_FILE_NAME,
  CONFIG_FILE_PATH,
  CWD,
  MOD_DIRECTORY_PATH,
} from "./constants";
import * as misc from "./misc";

const projectName = path.basename(CWD);
let modDir: string;
let modTargetPath: string;
let saveSlot: number;

export default async function checkForConfig(): Promise<void> {
  if (misc.exists(CONFIG_FILE_PATH)) {
    return;
  }

  await promptNewConfig();
  await checkProjectName();
  await getModDirectory();
  await checkModSubdirectory();
  await promptSaveSlot();
  configFile.write({
    modTargetPath,
    saveSlot,
  });
}

async function promptNewConfig() {
  console.log(
    chalk.red(
      `An "${CONFIG_FILE_NAME}" was not found in the current directory.`,
    ),
  );
  const response = await prompts({
    type: "confirm",
    name: "createConfig",
    message: "Would you like to create one now?",
    initial: true,
  });
  if (response.createConfig === false) {
    console.error(
      "Error: IsaacScript needs a config file in order to operate; exiting.",
    );
    process.exit(1);
  }
}

async function checkProjectName() {
  console.log(
    `From the directory you are in, it looks like the name of your mod project is: ${chalk.green(
      projectName,
    )}`,
  );
  const response = await prompts({
    type: "confirm",
    name: "inProjectDirectory",
    message: "Is that right?",
    initial: true,
  });
  if (response.inProjectDirectory === false) {
    console.error(
      "Navigate to the directory for your mod project before invoking isaacscript. Exiting.",
    );
    process.exit(1);
  }
}

async function getModDirectory() {
  if (misc.exists(MOD_DIRECTORY_PATH)) {
    modDir = MOD_DIRECTORY_PATH;
    return;
  }

  console.error(
    `Failed to find your mod directory at "${chalk.green(
      MOD_DIRECTORY_PATH,
    )}".`,
  );
  const response = await prompts({
    type: "text",
    name: "modDirectory",
    message:
      "Enter the full path to the directory where Binding of Isaac mods live on your system:",
  });

  if (typeof response.modDirectory !== "string") {
    console.error("Error: The response was not a string.");
    process.exit(1);
  }

  if (!misc.exists(response.modDirectory)) {
    console.error(
      `Error: The directory of "${chalk.green(
        response.modDirectory,
      )}" does not exist. Exiting.`,
    );
    process.exit(1);
  }

  if (!misc.isDir(response.modDirectory)) {
    console.error(
      `Error: The path of "${chalk.green(
        response.modDirectory,
      )}" is not a directory. Exiting.`,
    );
    process.exit(1);
  }

  modDir = response.modDirectory;
}

async function checkModSubdirectory() {
  if (misc.isSubDirOf(CWD, modDir)) {
    console.error(
      `Error: The mod project directory of "${chalk.green(
        CWD,
      )}" is a subdirectory of "${chalk.green(modDir)}".`,
    );
    console.error(
      `You are supposed to have your mod project folder somewhere else on the system than the Isaac mods directory. (This is because we don't want to upload the ".git" folder or the TypeScript files to the Steam Workshop.) Exiting.`,
    );
    process.exit(1);
  }

  modTargetPath = path.join(modDir, projectName);
  if (misc.exists(modTargetPath)) {
    console.error(
      `Error: The target mod path of "${chalk.green(
        modTargetPath,
      )}" already exists.`,
    );
    console.error(
      "IsaacScript wants to create a directory here so that it can keep it in sync with your project folder.",
    );
    const response = await prompts({
      type: "confirm",
      name: "deleteDirectory",
      message:
        "Should I delete the existing directory for you? (Make sure that it does not contain anything important first.)",
      initial: true,
    });
    if (response.deleteDirectory === false) {
      console.error("Ok then. You delete it yourself. Good bye.");
      process.exit(1);
    }

    misc.deleteDir(modTargetPath);
  }
}

async function promptSaveSlot() {
  const response = await prompts({
    type: "number",
    name: "saveSlot",
    message: "In-game, do you use save slot 1, 2, or 3?",
    initial: 1,
    validate: (value) =>
      value <= 0 || value >= 4
        ? `You must choose a number between 1 and 3.`
        : true,
  });
  saveSlot = response.saveSlot as number;
}
