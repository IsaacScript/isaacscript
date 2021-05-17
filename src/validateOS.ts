import chalk from "chalk";

export function validateOS(): void {
  if (process.platform !== "win32") {
    console.error(
      `IsaacScript is only supported on ${chalk.green("Windows")}.`,
    );
    console.error(
      "If you use another operating system and you want to use IsaacScript, contact Zamiel and let him know.",
    );
    console.error(
      "(Since the program is written in TypeScript, porting to a new operating system should be easy, but is untested.)",
    );

    process.exit(1);
  }
}
