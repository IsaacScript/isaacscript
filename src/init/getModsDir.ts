import chalk from "chalk";
import path from "path";
import prompts from "prompts";
import {
  DEFAULT_GAME_PATH,
  DEFAULT_ISAAC_NG_PATH,
  DEFAULT_MODS_PATH,
} from "../constants";
import * as file from "../file";

export default async function getModsDir(): Promise<string> {
  if (
    file.exists(DEFAULT_ISAAC_NG_PATH) &&
    file.isFile(DEFAULT_ISAAC_NG_PATH)
  ) {
    return DEFAULT_MODS_PATH;
  }

  console.error(
    `Failed to find your game directory at "${chalk.green(
      DEFAULT_GAME_PATH,
    )}".`,
  );
  const response = await prompts({
    type: "text",
    name: "isaacNGPath",
    message: 'Enter the full path to the "isaac-ng.exe" file on your system:',
  });

  if (typeof response.isaacNGPath !== "string") {
    console.error("Error: The response was not a string.");
    process.exit(1);
  }

  if (!file.exists(response.isaacNGPath)) {
    console.error(
      `Error: The file of "${chalk.green(
        response.isaacNGPath,
      )}" does not exist. Exiting.`,
    );
    process.exit(1);
  }

  if (!file.isFile(response.isaacNGPath)) {
    console.error(
      `Error: The path of "${chalk.green(
        response.isaacNGPath,
      )}" is not a file. Exiting.`,
    );
    process.exit(1);
  }

  // Get the directory that this file is in
  const gameDir = path.dirname(response.isaacNGPath);
  const modsDir = path.join(gameDir, "mods");

  return modsDir;
}
