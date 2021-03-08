import chalk from "chalk";
import { execSync } from "child_process";
import moment from "moment";

export function execScript(path: string): string {
  let stdout: string;
  try {
    stdout = execSync(`"${path}"`).toString().trim();
  } catch (err) {
    console.error(`Failed to run the "${chalk.green(path)}" script:`, err);
    process.exit(1);
  }

  return stdout;
}

export function getTime(): string {
  return moment().format("h:mm:ss A"); // e.g. "1:23:45 AM"
}
