import chalk from "chalk";
import path from "path";
import { CURRENT_DIRECTORY_NAME, CWD } from "../../constants";
import { getInputString, getInputYesNo } from "../../prompt";
import { error, hasWhiteSpace, isKebabCase } from "../../utils";

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
  useCurrentDir: boolean,
  yes: boolean,
  forceName: boolean,
): Promise<[string, boolean]> {
  let projectName = getProjectNameFromCommandLineArgument(argv);
  let projectPath: string;
  let createNewDir: boolean;
  if (useCurrentDir) {
    // The "--use-current-dir" command-line flag was specified,
    // so there is no need to prompt the user
    projectName = CURRENT_DIRECTORY_NAME;
    projectPath = CWD;
    createNewDir = false;
  } else if (projectName !== undefined) {
    // The project name was specified on the command-line
    projectPath = path.join(CWD, projectName);
    createNewDir = true;
  } else if (yes) {
    // The "--yes" command-line flag was specified and the project name was not specified on the
    // command-line, so default to using the current directory
    projectName = CURRENT_DIRECTORY_NAME;
    projectPath = CWD;
    createNewDir = false;
  } else {
    // The project name was not specified on the command-line, so prompt the user for it
    [projectName, projectPath, createNewDir] = await getNewProjectName();
  }

  validateProjectName(projectName, forceName);

  console.log(`Using a project name of: ${chalk.green(projectName)}`);
  return [projectPath, createNewDir];
}

function getProjectNameFromCommandLineArgument(
  argv: Record<string, unknown>,
): string | undefined {
  return typeof argv.name === "string" && argv.name !== ""
    ? argv.name
    : undefined;
}

async function getNewProjectName(): Promise<[string, string, boolean]> {
  console.log("You did not specify a project name as a command-line argument.");
  const shouldUseCurrentDir = await getInputYesNo(
    `Would you like to create a new project using the current directory "${chalk.green(
      CURRENT_DIRECTORY_NAME,
    )}" as the root?`,
  );

  if (shouldUseCurrentDir) {
    return [CURRENT_DIRECTORY_NAME, CWD, false];
  }

  const projectName = await getInputString("Enter the name of the project:");
  const projectPath = path.join(CWD, projectName);

  return [projectName, projectPath, true];
}

function validateProjectName(projectName: string, forceName: boolean) {
  if (projectName === "") {
    error("Error: You cannot have a blank project name.");
  }

  if (process.platform === "win32") {
    for (const character of ILLEGAL_CHARACTERS_FOR_WINDOWS_FILENAMES) {
      if (projectName.includes(character)) {
        error(
          `Error: The "${character}" character is not allowed in a Windows file name.`,
        );
      }
    }
  }

  if (forceName) {
    return;
  }

  if (hasWhiteSpace(projectName)) {
    error(
      'Error: The project name has whitespace in it, which is not allowed. Use kebab-case for your project name. (e.g. "green-candle")',
    );
  }

  if (!isKebabCase(projectName)) {
    error(
      'Error: The project name is not in kebab-case. (Kebab-case is the style of using all lowercase letters, with words separated by hyphens.) Project names must use kebab-case to match GitHub repository standards. If necessary, you can override this check with the "--force-name" flag.',
    );
  }
}
