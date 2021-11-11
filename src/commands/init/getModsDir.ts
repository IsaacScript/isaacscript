import chalk from "chalk";
import os from "os";
import path from "path";
import prompts from "prompts";
import * as file from "../../file";
import { error } from "../../util";

// https://stackoverflow.com/questions/9080085/node-js-find-home-directory-in-platform-agnostic-way
const homeDir = os.homedir();

const MODS = "mods";

const DEFAULT_MODS_PATH_WINDOWS = path.join(
  "C:",
  "Program Files (x86)",
  "Steam",
  "steamapps",
  "common",
  "The Binding of Isaac Rebirth",
  MODS,
);

// This is a subdirectory of $HOME
const DEFAULT_MODS_PATH_LINUX = path.join(
  homeDir,
  ".local",
  "share",
  "Steam",
  "steamapps",
  "common",
  "The Binding of Isaac Rebirth",
  MODS,
);

export async function getModsDir(
  argv: Record<string, unknown>,
): Promise<string> {
  if (argv.modsDirectory !== undefined) {
    // They specified the "--mods-directory" command-line flag,
    // so there is no need to prompt the user for it
    return argv.modsDirectory as string;
  }

  const defaultModsPath = getDefaultModsPath(process.platform);

  if (file.exists(defaultModsPath) && file.isDir(defaultModsPath)) {
    return defaultModsPath;
  }

  console.error(
    `Failed to find your mods directory at: ${chalk.green(defaultModsPath)}`,
  );
  const response = await prompts({
    type: "text",
    name: "modsDir",
    message: `Enter the full path to the "${MODS}" directory on your system, which should be next to your "isaac-ng.exe" program:`,
  });

  if (typeof response.modsDir !== "string") {
    error("Error: The response was not a string.");
  }
  const modsDir = response.modsDir.trim();

  if (!file.exists(modsDir)) {
    error(
      `Error: The directory of "${chalk.green(
        modsDir,
      )}" does not exist. Exiting.`,
    );
  }

  if (!file.isDir(modsDir)) {
    error(
      `Error: The path of "${chalk.green(
        modsDir,
      )}" is not a directory. Exiting.`,
    );
  }

  if (path.basename(modsDir) !== MODS) {
    error(
      `Error: You entered a path of "${chalk.green(
        modsDir,
      )}", but you need to input a directory with a name of "${MODS}" at the end. Exiting.`,
    );
  }

  return modsDir;
}

function getDefaultModsPath(platform: string) {
  switch (platform) {
    case "win32": {
      return DEFAULT_MODS_PATH_WINDOWS;
    }

    case "linux": {
      return DEFAULT_MODS_PATH_LINUX;
    }

    default: {
      error(
        `There does not exist a default mod path for the platform of: ${chalk.green(
          platform,
        )}`,
      );
      return "";
    }
  }
}
