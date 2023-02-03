import chalk from "chalk";
import { ReadonlySet } from "isaacscript-common-ts";
import { PROJECT_NAME } from "./constants.js";
import { Args } from "./parseArgs.js";

const VALID_PLATFORMS = new ReadonlySet<string>(["win32", "linux"]);

export function validateOS(args: Args): void {
  const ts = args.ts === true;
  if (ts) {
    return;
  }

  if (VALID_PLATFORMS.has(process.platform)) {
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
