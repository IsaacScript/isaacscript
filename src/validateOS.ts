import chalk from "chalk";

const VALID_PLATFORMS = ["win32", "linux"];

export function validateOS(): void {
  if (VALID_PLATFORMS.includes(process.platform)) {
    return;
  }

  console.error(
    `IsaacScript is only supported on ${chalk.green(
      "Windows",
    )} and ${chalk.green("Linux")}.`,
  );
  console.error(
    "If you use another operating system and you want to use IsaacScript, contact Zamiel and let him know.",
  );
  console.error(
    "(Since the program is written in TypeScript, porting to a new operating system should be easy, but is untested.)",
  );
  process.exit(1);
}
