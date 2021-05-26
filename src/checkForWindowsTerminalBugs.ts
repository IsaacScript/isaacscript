import chalk from "chalk";
import fs from "fs";
import prompts from "prompts";
import { BASH_PROFILE_PATH, WINDOWS_CODE_PAGE } from "./constants";
import * as file from "./file";
import { execExe } from "./misc";

// By default, Git Bash for Windows uses MINGW64
// This will not work correctly with the prompts library (or any other NodeJS input library)
// Try to detect this and warn the end-user
export default async function checkForWindowsTerminalBugs(): Promise<void> {
  if (process.platform !== "win32") {
    return;
  }

  if (process.env.SHELL !== "C:\\Program Files\\Git\\usr\\bin\\bash.exe") {
    return;
  }

  await checkForCodePage();
  await checkForWindowsBugColor();
}

async function checkForCodePage() {
  const chcpPath = "C:\\Windows\\System32\\chcp.com";
  const stdout = execExe(chcpPath).trim();
  // The output of "chcp" will be different depending on the language of the Windows installation,
  // so we only parse the final number
  const match = /(\d+)$/.exec(stdout);
  if (match === null) {
    console.error(
      `Failed to parse the results of "${chalk.green(chcpPath)}":`,
      stdout,
    );
    process.exit(1);
  }

  const activeCodePage = match[1].trim();
  if (activeCodePage === WINDOWS_CODE_PAGE) {
    return;
  }

  console.error(
    chalk.red(
      `Error: It looks like you are using Git Bash for Windows (MINGW64) with an incorrect code page of "${chalk.green(
        activeCodePage,
      )}". (It should be equal to "${WINDOWS_CODE_PAGE}".)`,
    ),
  );
  const response = await prompts({
    type: "confirm",
    name: "fixCodePage",
    message:
      'Do you want me to fix this for you? (Type "y", then press "enter".)',
    initial: true,
  });
  if (response.fixCodePage === false) {
    console.error("Ok then. Good-bye.");
    process.exit(1);
  }

  applyFixesToBashProfile();
}

async function checkForWindowsBugColor() {
  if (process.env.FORCE_COLOR === "true") {
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

  const response = await prompts({
    type: "confirm",
    name: "fixColors",
    message:
      'Do you want me to fix this for you? (Type "y", then press "enter".)',
    initial: true,
  });
  if (response.fixColors === false) {
    console.error("Ok then. Good-bye.");
    process.exit(1);
  }

  applyFixesToBashProfile();
}

function applyFixesToBashProfile() {
  // Check to see if the Bash profile has data
  let bashProfileContents: string;
  if (file.exists(BASH_PROFILE_PATH)) {
    bashProfileContents = file.read(BASH_PROFILE_PATH);
  } else {
    bashProfileContents = "";
  }

  // Prepare the text to append
  let newText = "";
  if (
    bashProfileContents !== "" &&
    bashProfileContents[bashProfileContents.length - 1] !== "\n"
  ) {
    // If the Bash profile exists and has data, it should end in a newline
    // Add an extra newline if this is not the case
    newText += "\n";
  }
  if (bashProfileContents !== "") {
    // If the Bash profile exists and has data, add an extra newline between the existing stuff and
    // the new lines added by us
    newText += "\n";
  }
  newText += "# Terminal fixes added by IsaacScript\n";
  newText += `chcp.com ${WINDOWS_CODE_PAGE} > /dev/null\n`;
  newText += "export FORCE_COLOR=true\n";

  try {
    fs.appendFileSync(BASH_PROFILE_PATH, newText);
  } catch (err) {
    console.error(`Failed to append text to "${BASH_PROFILE_PATH}":`, err);
    process.exit(1);
  }

  console.log(
    chalk.green("Complete!"),
    `I have added the terminal fixes to "${BASH_PROFILE_PATH}".`,
  );
  console.log(
    chalk.red(
      "Please close and re-open your terminal, then run this program again.",
    ),
  );
  process.exit(0);
}
