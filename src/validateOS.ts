import chalk from "chalk";
import { PROJECT_NAME } from "./constants";

const VALID_PLATFORMS = ["win32", "linux"];

export function validateOS(): void {
  if (VALID_PLATFORMS.includes(process.platform)) {
    return;
  }

  console.error(
    `${PROJECT_NAME} is only supported on ${chalk.green(
      "Windows",
    )} and ${chalk.green("Linux")}.`,
  );
  console.error(
    `If you use another operating system and you want to use ${PROJECT_NAME}, make a request in the community Discord server.`,
  );
  process.exit(1);
}
