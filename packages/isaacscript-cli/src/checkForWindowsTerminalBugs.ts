import chalk from "chalk";
import { fatalError, isFile, readFile } from "isaacscript-common-node";
import fs from "node:fs";
import path from "node:path";
import { HOME_DIR, PROJECT_NAME } from "./constants.js";
import { getInputYesNo } from "./prompt.js";

const BASH_PROFILE_PATH = path.join(HOME_DIR, ".bash_profile");

/**
 * By default, Git Bash for Windows uses MINGW64. This will not work correctly with the prompt
 * library. Try to detect this and warn the end-user.
 */
export async function checkForWindowsTerminalBugs(): Promise<void> {
  if (process.platform !== "win32") {
    return;
  }

  if (process.env["SHELL"] !== "C:\\Program Files\\Git\\usr\\bin\\bash.exe") {
    return;
  }

  await checkForWindowsBugColor();
}

async function checkForWindowsBugColor() {
  if (process.env["FORCE_COLOR"] === "true") {
    return;
  }

  console.error(
    chalk.red(
      `Error: It looks like you are using Git Bash for Windows (MINGW64) without the "${chalk.green(
        "FORCE_COLOR",
      )}" environment variable.`,
    ),
  );
  console.error(
    "This is necessary in order for colors to work properly in the terminal.",
  );

  const shouldFixColors = await getInputYesNo(
    "Do you want me to fix this for you?",
  );
  if (!shouldFixColors) {
    return;
  }

  applyFixesToBashProfile();
}

function applyFixesToBashProfile() {
  // Check to see if the Bash profile has data.
  const bashProfileContents = isFile(BASH_PROFILE_PATH)
    ? readFile(BASH_PROFILE_PATH)
    : "";

  const appendText = getBashProfileAppendText(bashProfileContents);

  try {
    fs.appendFileSync(BASH_PROFILE_PATH, appendText);
  } catch (error) {
    fatalError(`Failed to append text to "${BASH_PROFILE_PATH}":`, error);
  }

  console.log(
    `The terminal fixes have been added to: ${chalk.green(BASH_PROFILE_PATH)}`,
    chalk.red(
      "Please close and re-open your terminal, then run this program again.",
    ),
  );
  process.exit(0);
}

function getBashProfileAppendText(bashProfileContents: string) {
  let newText = "";

  if (bashProfileContents !== "" && !bashProfileContents.endsWith("\n")) {
    // If the Bash profile exists and has data, it should end in a newline. Add an extra newline if
    // this is not the case.
    newText += "\n";
  }

  if (bashProfileContents !== "") {
    // If the Bash profile exists and has data, add an extra newline between the existing stuff and
    // the new lines added by us.
    newText += "\n";
  }

  newText += `# Terminal fixes added by ${PROJECT_NAME}\n`;
  newText += "export FORCE_COLOR=true\n";

  return newText;
}
