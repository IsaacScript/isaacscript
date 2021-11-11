import chalk from "chalk";
import path from "path";
import prompts from "prompts";
import { CURRENT_DIRECTORY_NAME, CWD } from "../../constants";
import { error, hasWhiteSpace } from "../../util";

// From: https://gist.github.com/doctaphred/d01d05291546186941e1b7ddc02034d3
const ILLEGAL_CHARACTERS_FOR_WINDOWS_FILENAMES = [
  "<",
  ">",
  ":",
  '"',
  "/",
  "\\",
  "|",
  "?",
  "*",
];

export async function getProjectPath(
  argv: Record<string, unknown>,
): Promise<[string, boolean]> {
  let projectName = getProjectNameFromCommandLineArgument(argv);
  let projectPath: string;
  let createNewDir: boolean;
  if (argv.useCurrentDir !== undefined) {
    // The "--use-current-dir" command-line flag was specified,
    // so there is no need to prompt the user
    projectName = CURRENT_DIRECTORY_NAME;
    projectPath = CWD;
    createNewDir = false;
  } else if (projectName !== null) {
    // The project name was specified on the command-line
    projectPath = path.join(CWD, projectName);
    createNewDir = true;
  } else {
    // The project name was not specified on the command-line, so prompt the user for it
    [projectName, projectPath, createNewDir] = await getNewProjectName();
  }

  if (!validateProjectName(projectName)) {
    process.exit(1);
  }

  console.log(`Using a project name of: ${chalk.green(projectName)}`);
  return [projectPath, createNewDir];
}

function getProjectNameFromCommandLineArgument(
  argv: Record<string, unknown>,
): string | null {
  return typeof argv.name === "string" && argv.name !== "" ? argv.name : null;
}

async function getNewProjectName(): Promise<[string, string, boolean]> {
  console.log("You did not specify a project name as a command-line argument.");
  const response1 = await prompts({
    type: "confirm",
    name: "useCurrentDir",
    message: `Would you like to create a new project using the current directory "${chalk.green(
      CURRENT_DIRECTORY_NAME,
    )}" as the root?`,
    initial: true,
  });

  if (response1.useCurrentDir === true) {
    return [CURRENT_DIRECTORY_NAME, CWD, false];
  }

  const response2 = await prompts({
    type: "text",
    name: "projectName",
    message: "Enter the name of the project:",
  });

  if (typeof response2.projectName !== "string") {
    error("Error: The response was not a string.");
  }
  const projectName = response2.projectName.trim();
  const projectPath = path.join(CWD, projectName);

  return [projectName, projectPath, true];
}

function validateProjectName(projectName: string) {
  if (projectName === "") {
    console.error("Error: You cannot have a blank project name.");
    return false;
  }

  if (process.platform === "win32") {
    for (const character of ILLEGAL_CHARACTERS_FOR_WINDOWS_FILENAMES) {
      if (projectName.includes(character)) {
        console.error(
          `Error: The "${character}" character is not allowed in a Windows file name.`,
        );
        return false;
      }
    }
  }

  if (hasWhiteSpace(projectName)) {
    console.error(
      'Error: The project name has whitespace in it, which is not allowed. Use kebab-case for your project name. (e.g. "green-candle")',
    );
    return false;
  }

  return true;
}
