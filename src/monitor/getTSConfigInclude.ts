import chalk from "chalk";
import * as JSONC from "jsonc-parser";
import { TSCONFIG_PATH } from "../constants";
import * as file from "../file";

export default function getTSConfigInclude(): string {
  const tsConfigRaw = file.read(TSCONFIG_PATH);
  let tsConfig: Record<string, string[]>;
  try {
    tsConfig = JSONC.parse(tsConfigRaw) as Record<string, string[]>;
  } catch (err) {
    console.error(`Failed to parse "${chalk.green(TSCONFIG_PATH)}":`, err);
    process.exit(1);
  }

  if (!Object.prototype.hasOwnProperty.call(tsConfig, "include")) {
    console.error(
      `Your "${chalk.green(
        TSCONFIG_PATH,
      )}" file does not have an include directive, which is surely a mistake. Delete the file and re-run isaacscript.`,
    );
    process.exit(1);
  }
  if (tsConfig.include.length === 0) {
    console.error(
      `Your "${chalk.green(
        TSCONFIG_PATH,
      )}" file has an empty include directive, which is surely a mistake. Delete the file and re-run isaacscript.`,
    );
    process.exit(1);
  }

  return tsConfig.include[0];
}
