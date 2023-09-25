import chalk from "chalk";
import path from "node:path";
import { HOME_DIR } from "../../constants.js";
import { fileExists, isDir } from "../../file.js";
import { fatalError } from "../../isaacScriptCommonTS.js";
import type { Args } from "../../parseArgs.js";
import { getInputString } from "../../prompt.js";

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

/** This is a subdirectory of `$HOME`. */
const DEFAULT_MODS_PATH_LINUX = path.join(
  HOME_DIR,
  ".local",
  "share",
  "Steam",
  "steamapps",
  "common",
  "The Binding of Isaac Rebirth",
  MODS,
);

export async function getModsDir(
  args: Args,
  typeScript: boolean,
  verbose: boolean,
): Promise<string | undefined> {
  if (typeScript) {
    return undefined;
  }

  if (args.modsDirectory !== undefined) {
    // They specified the "--mods-directory" command-line flag, so there is no need to prompt the
    // user for it.
    return args.modsDirectory;
  }

  const defaultModsPath = getDefaultModsPath(process.platform);

  if (fileExists(defaultModsPath, verbose) && isDir(defaultModsPath, verbose)) {
    return defaultModsPath;
  }

  console.error(
    `Failed to find your mods directory at: ${chalk.green(defaultModsPath)}`,
  );
  const modsDir = await getInputString(
    `Enter the full path to the "${MODS}" directory on your system, which should be next to your "isaac-ng.exe" program:`,
  );

  if (modsDir === "") {
    fatalError("Error: You did not provide a response; exiting.");
  }

  if (!fileExists(modsDir, verbose)) {
    fatalError(
      `Error: The directory of "${chalk.green(
        modsDir,
      )}" does not exist. Exiting.`,
    );
  }

  if (!isDir(modsDir, verbose)) {
    fatalError(
      `Error: The path of "${chalk.green(
        modsDir,
      )}" is not a directory. Exiting.`,
    );
  }

  if (path.basename(modsDir) !== MODS) {
    fatalError(
      `Error: You entered a path of "${chalk.green(
        modsDir,
      )}", but you need to input a directory with a name of "${MODS}" at the end. Exiting.`,
    );
  }

  return modsDir;
}

function getDefaultModsPath(platform: string): string {
  switch (platform) {
    case "win32": {
      return DEFAULT_MODS_PATH_WINDOWS;
    }

    case "linux": {
      return DEFAULT_MODS_PATH_LINUX;
    }

    default: {
      return fatalError(
        `There does not exist a default mod path for the platform of: ${chalk.green(
          platform,
        )}`,
      );
    }
  }
}
