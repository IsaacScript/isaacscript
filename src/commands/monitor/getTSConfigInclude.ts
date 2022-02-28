import chalk from "chalk";
import * as JSONC from "jsonc-parser";
import { TSCONFIG_PATH } from "../../constants";
import * as file from "../../file";
import { error } from "../../utils";

export function getTSConfigInclude(): string {
  const tsConfigRaw = file.read(TSCONFIG_PATH);
  let tsConfig: Record<string, string[]>;
  try {
    tsConfig = JSONC.parse(tsConfigRaw) as Record<string, string[]>;
  } catch (err) {
    error(`Failed to parse "${chalk.green(TSCONFIG_PATH)}":`, err);
  }

  if (!Object.prototype.hasOwnProperty.call(tsConfig, "include")) {
    error(
      `Your "${chalk.green(
        TSCONFIG_PATH,
      )}" file does not have an include directive, which is surely a mistake. Delete the file and re-run isaacscript.`,
    );
  }
  if (tsConfig.include.length === 0) {
    error(
      `Your "${chalk.green(
        TSCONFIG_PATH,
      )}" file has an empty include directive, which is surely a mistake. Delete the file and re-run isaacscript.`,
    );
  }

  return tsConfig.include[0];
}
