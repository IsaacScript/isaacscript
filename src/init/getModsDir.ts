import chalk from "chalk";
import prompts from "prompts";
import { DEFAULT_MODS_PATH } from "../constants";
import * as file from "../file";

export default async function getModsDir(): Promise<string> {
  if (file.exists(DEFAULT_MODS_PATH) && file.isDir(DEFAULT_MODS_PATH)) {
    return DEFAULT_MODS_PATH;
  }

  console.error(
    `Failed to find your mods directory at "${chalk.green(
      DEFAULT_MODS_PATH,
    )}".`,
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

  if (!file.exists(response.modsDir)) {
    console.error(
      `Error: The directory of "${chalk.green(
        response.modsDir,
      )}" does not exist. Exiting.`,
    );
    process.exit(1);
  }

  if (!file.isDir(response.modsDir)) {
    console.error(
      `Error: The path of "${chalk.green(
        response.modsDir,
      )}" is not a directory. Exiting.`,
    );
    process.exit(1);
  }

  return response.modsDir;
}
