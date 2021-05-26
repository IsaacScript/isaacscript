import chalk from "chalk";
import prompts from "prompts";
import {
  DEFAULT_MODS_PATH_LINUX,
  DEFAULT_MODS_PATH_WINDOWS,
} from "../constants";
import * as file from "../file";

export default async function getModsDir(): Promise<string> {
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
    message:
      'Enter the full path to the "mods" directory on your system, which should be next to your "isaac-ng.exe" program:',
  });

  if (typeof response.modsDir !== "string") {
    console.error("Error: The response was not a string.");
    process.exit(1);
  }
  const modsDir = response.modsDir.trim();

  if (!file.exists(modsDir)) {
    console.error(
      `Error: The directory of "${chalk.green(
        modsDir,
      )}" does not exist. Exiting.`,
    );
    process.exit(1);
  }

  if (!file.isDir(modsDir)) {
    console.error(
      `Error: The path of "${chalk.green(
        modsDir,
      )}" is not a directory. Exiting.`,
    );
    process.exit(1);
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
      console.error(
        `There does not exist a default mod path for the platform of: ${chalk.green(
          platform,
        )}`,
      );
      process.exit(1);
      return "";
    }
  }
}
