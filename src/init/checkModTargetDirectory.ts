import chalk from "chalk";
import path from "path";
import prompts from "prompts";
import * as file from "../file";

export default async function checkModTargetDirectory(
  modsDirectory: string,
  projectName: string,
): Promise<void> {
  const modTargetPath = path.join(modsDirectory, projectName);
  if (!file.exists(modTargetPath)) {
    return;
  }

  console.error(
    `Error: The target mod path of "${chalk.green(
      modTargetPath,
    )}" already exists.`,
  );
  console.error(
    "When you run IsaacScript, it will want to create a directory here so that it can sync it with your project folder.",
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

  file.deleteDir(modTargetPath);
}
