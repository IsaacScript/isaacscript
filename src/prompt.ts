// Both the Inquirer.js library and the Prompts library have a bug where text is duplicated in a Git
// Bash terminal
// Thus, we revert to using the simpler Prompt library

import chalk from "chalk";
import prompt from "prompt";
import { error, parseIntSafe } from "./util";

const VALID_YES_RESPONSES = new Set(["yes", "ye", "y"]);
const VALID_NO_RESPONSES = new Set(["no", "n"]);

export function promptInit(): void {
  // Override some of the prompt library's default values
  // https://github.com/flatiron/prompt#customizing-your-prompt
  prompt.message = chalk.green("?");
  prompt.delimiter = " ";
  prompt.colors = false;
}

export async function getInputYesNo(
  msg: string,
  defaultValue = true,
): Promise<boolean> {
  prompt.start();

  // Capitalize the letter that represents the default option
  const y = defaultValue ? "Y" : "y";
  const n = defaultValue ? "n" : "N";

  const questionSuffix = `(${y}\\${n})`;
  const description = `${chalk.bold(msg)} ${chalk.gray(questionSuffix)}`;

  const { response } = await prompt.get({
    properties: {
      response: {
        type: "string",
        description,
      },
    },
  });

  if (typeof response !== "string") {
    console.log(typeof response);
    error("Failed to get a proper response from the prompt library.");
  }

  const cleanedResponse = response.toLowerCase().trim();

  // Default to true
  if (cleanedResponse === "") {
    return defaultValue;
  }

  if (VALID_YES_RESPONSES.has(cleanedResponse)) {
    return true;
  }

  if (VALID_NO_RESPONSES.has(cleanedResponse)) {
    return false;
  }

  error('Invalid response; must answer "yes" or "no".');
  return false;
}

export async function getInputString(
  msg: string,
  defaultValue?: string,
): Promise<string> {
  prompt.start();

  let description = `${chalk.bold(msg)}`;
  if (defaultValue !== undefined) {
    description += ` ${chalk.gray(`(${defaultValue})`)}`;
  }

  const { response } = await prompt.get({
    properties: {
      response: {
        type: "string",
        description,
      },
    },
  });

  if (typeof response !== "string") {
    error("Failed to get a proper response from the prompt library.");
  }

  if (response === "" && defaultValue !== undefined) {
    return defaultValue;
  }

  return response.trim();
}

export async function getInputInt(
  msg: string,
  defaultValue = 1,
): Promise<number> {
  const defaultValueString = defaultValue.toString();
  const string = await getInputString(msg, defaultValueString);
  const int = parseIntSafe(string);

  if (Number.isNaN(int)) {
    error("Error: You must enter an integer.");
  }

  return int;
}
