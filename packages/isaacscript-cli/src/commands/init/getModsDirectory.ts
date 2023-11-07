import chalk from "chalk";
import { fatalError, isDirectory } from "isaacscript-common-node";
import path from "node:path";
import { HOME_DIR } from "../../constants.js";
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

export async function getModsDirectory(
  modsDirectoryOption: string | undefined,
): Promise<string> {
  if (modsDirectoryOption !== undefined && modsDirectoryOption !== "") {
    return modsDirectoryOption;
  }

  const defaultModsPath = getDefaultModsPath(process.platform);

  if (isDirectory(defaultModsPath)) {
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

  if (!isDirectory(modsDir)) {
    fatalError(
      `Error: The directory of "${chalk.green(
        modsDir,
      )}" does not exist. Exiting.`,
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
