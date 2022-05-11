import chalk from "chalk";
import path from "path";
import { HOME_DIR } from "../../constants";
import * as file from "../../file";
import { getInputString } from "../../prompt";
import { error } from "../../utils";

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
  argv: Record<string, unknown>,
  verbose: boolean,
): Promise<string> {
  if (argv["modsDirectory"] !== undefined) {
    // They specified the "--mods-directory" command-line flag, so there is no need to prompt the
    // user for it.
    return argv["modsDirectory"] as string;
  }

  const defaultModsPath = getDefaultModsPath(process.platform);

  if (
    file.exists(defaultModsPath, verbose) &&
    file.isDir(defaultModsPath, verbose)
  ) {
    return defaultModsPath;
  }

  console.error(
    `Failed to find your mods directory at: ${chalk.green(defaultModsPath)}`,
  );
  const modsDir = await getInputString(
    `Enter the full path to the "${MODS}" directory on your system, which should be next to your "isaac-ng.exe" program:`,
  );

  if (modsDir === "") {
    error("Error: You did not provide a response; exiting.");
  }

  if (!file.exists(modsDir, verbose)) {
    error(
      `Error: The directory of "${chalk.green(
        modsDir,
      )}" does not exist. Exiting.`,
    );
  }

  if (!file.isDir(modsDir, verbose)) {
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
      return error(
        `There does not exist a default mod path for the platform of: ${chalk.green(
          platform,
        )}`,
      );
    }
  }
}
