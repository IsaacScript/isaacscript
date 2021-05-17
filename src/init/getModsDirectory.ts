import chalk from "chalk";
import prompts from "prompts";
import { MODS_DIRECTORY_PATH } from "../constants";
import * as file from "../file";

export default async function getModsDirectory(): Promise<string> {
  if (file.exists(MODS_DIRECTORY_PATH) && file.isDir(MODS_DIRECTORY_PATH)) {
    return MODS_DIRECTORY_PATH;
  }

  console.error(
    `Failed to find your mods directory at "${chalk.green(
      MODS_DIRECTORY_PATH,
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

  if (!file.exists(response.modDirectory)) {
    console.error(
      `Error: The directory of "${chalk.green(
        response.modDirectory,
      )}" does not exist. Exiting.`,
    );
    process.exit(1);
  }

  if (!file.isDir(response.modDirectory)) {
    console.error(
      `Error: The path of "${chalk.green(
        response.modDirectory,
      )}" is not a directory. Exiting.`,
    );
    process.exit(1);
  }

  return response.modDirectory;
}
